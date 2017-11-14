var express =                       require("express"),
    app =                           express(),
    // aaa =                           require("../middleware/aaa.js"),
    mail =                          require("../middleware/mail.js"),
    iQ =                            require('../middleware/iQ.js'),
    router =                        express.Router({mergeParams: true}),
    passport =                      require("passport"),
    async =                         require('async'),
    crypto =                        require('crypto'),
    // nodemailer =                    require('nodemailer'),
    data =                          require('../middleware/data/data.js'),
    User =                          require("../models/user.js"),
    owasp =                         require('owasp-password-strength-test');

var route = {
    module: 'Administration',
};
// ===== Root Route =====
router.get("/", function(req, res) {
    // console.log(user);
    res.render("index", {
        user: req.user
    });
});

// ===== Authentication Routes =====

// Pre-Register - get email address for compare to extUsers table in Access
router.get("/preRegister", function(req, res){
   res.render("preRegister", {
        user: req.user
    }); 
});
var username;
var records = {};
router.get("/register", function(req, res){
    username = req.query.username;
    var params = iQ.preRegParams;
        params.query = "{'7'.EX.'" + username + "'}";
    iQ.quickbase.api('API_DoQuery', params, function(err, result) {
        if(err) {
          req.flash('error', err);
        } else {
          records = result.table.records;
          if(records.length === 1) {
              res.render("register", {
                  username: username, 
                  records: records,
                  route: route
                });
          } else {
              req.flash('error', username + ' is not on the list of authorized accounts.  Please contact GNCI at (949) 151-1960 for assistance.');
              res.redirect("back");
            }
        }
    });
});


// Registration logic
router.post("/register", function(req, res){
    var user = new User({
        username: (req.body.username).toLowerCase(),
        password: req.body.password,
        confirm: req.body.confirm,
        name: req.body.name,
        company: req.body.company,
        survey: req.body.survey,
        react: req.body.react,
        asset: req.body.asset
    });
    // Hardened password piece
    owasp.config({
      minLength: 8,                 // Default is 10 - set to 8
      minOptionalTestsToPass : 3    // 4 Optional tests: Upper, Lower, Number, SpecChar - set to 3 so SpecChar isn't req'd
    });
    pwdResult = owasp.test(user.password);
    if(req.body.password != req.body.confirm) {
      req.flash('error', "Your password confirmation didn't match your password.  Please give it another shot.");
      return res.redirect('back');
    }
    console.log(typeof(pwdResult.strong));
    if(pwdResult.strong != true) {
        req.flash('error', "Passwords need to be 8+ characters long and contain at least one each of the following: UPPERCASE letter, lowercase letter, number.");
        res.redirect('back');
      } else {
    user.save(function(err) {
        req.logIn(user, function(err) {
            res.redirect('/surveys');
        });
    })};
});

// Login
router.get("/login", function(req, res){
   res.render("login", {
     user: req.user,
     route: route
   }); 
});

// Login logic
router.post("/login", function(req, res, next) {
    passport.authenticate("local", function(err, user, info) {
        if(err) {
          return next(err);
        };
        if(!user) {
          req.flash('error', 'Your username and/or password is incorrect.  Please try again.');
            return res.redirect('back');
        }
        req.logIn(user, function(err) {
            if(err) return next(err);
            return res.redirect('/');
        });
    })(req, res, next);
});

// Forgot Password
router.get("/forgot", function(req, res) {
    res.render('forgot', {
        user: req.user,
        route: route
    });
});

// Forgot Password logic
router.post('/forgot', function(req, res, next) {
  async.waterfall([
    function(done) {
      crypto.randomBytes(20, function(err, buf) {
        if(err) {
          req.flash('error', 'After Crypto: ' + err);
        }
        var token = buf.toString('hex');
        done(err, token);
      });
    },
    function(token, done) {
      User.findOne({ username: (req.body.username).toLowerCase() }, function(err, user) {
        if(err) {
            req.flash('error', err);
        } if (!user) {
          req.flash('error', 'No account with that email address exists.');
          return res.redirect('/forgot');
        }
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
        user.save(function(err) {
          done(err, token, user);
        });
      });
    },
    function(token, user, done) {
      var smtpTransport = mail.smtpTransport;
      var mailOptions = mail.resetMail;
          mailOptions.to = user.username;
          mailOptions.text = 'You are receiving this because GNCI received a request to reset the password for your account.\n\n' +
              'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
              'http://' + req.headers.host + '/reset/' + token + '\n\n' +
              'If you did not request this, please ignore this email and your password will remain unchanged.\n';
      smtpTransport.sendMail(mailOptions, function(err) {
        req.flash('info', 'An e-mail has been sent to ' + user.username + ' with further instructions.');
        done(err, 'done');
      });
    }
  ], function(err) {
    if (err) return next(err);
    res.redirect('/');
  });
});

// Reset Route
router.get('/reset/:token', function(req, res) {
  User.findOne({ 
    resetPasswordToken: req.params.token, 
    resetPasswordExpires: { $gt: Date.now() } 
  }, function(err, user) {
    if (!user) {
      req.flash('error', 'Password reset token is invalid or has expired.');
      return res.redirect('/forgot');
    }
    res.render('reset', {
      user: req.user,
      route: route
    });
  });
});

// Reset Logic
router.post('/reset/:token', function(req, res) {
  async.waterfall([
    function(done) {
      User.findOne({ resetPasswordToken: req.params.token, 
        resetPasswordExpires: { $gt: Date.now() } 
      }, function(err, user) {
        if (!user) {
          req.flash('error', 'Password reset token is invalid or has expired.');
          return res.redirect('back');
        }
        user.password = req.body.password;
        owasp.config({
          minLength: 8,                 // Default is 10 - set to 8
          minOptionalTestsToPass : 3    // 4 Optional tests: Upper, Lower, Number, SpecChar - set to 3 so SpecChar isn't req'd
        });
        pwdResult = owasp.test(user.password);
        if(req.body.password != req.body.confirm) {
          req.flash('error', "Your password confirmation didn't match your password.  Please give it another shot.");
          return res.redirect('back');
        }
        if(pwdResult.strong != true) {
          req.flash('error', "Passwords need to be 8+ characters long and contain at least one each of the following: UPPERCASE letter, lowercase letter, number.");
          res.redirect('back');
        } else {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        user.save(function(err) {
          if(err) {
            req.flash('error', err);
          }
          req.logIn(user, function(err) {
            done(err, user);
          });
        });
      }});
    },
    function(user, done) {
      var smtpTransport = mail.smtpTransport;
      var mailOptions = {
        to: user.username,
        from: 'awss@gnciwireless.com',
        subject: 'Your password has been changed',
        text: 'Hello,\n\n' +
          'This is a confirmation that the password for your account ' + user.username + ' has just been changed.\n'
      };
      smtpTransport.sendMail(mailOptions, function(err) {
        req.flash('success', 'Success! Your password has been changed.');
        done(err);
      });
    }
  ], function(err) {
    res.redirect('/');
  });
});

// Logout
router.get("/logout", function(req, res){
   req.logout();
   res.redirect("/");
});


module.exports = router; 