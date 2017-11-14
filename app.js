var express =               require('express'),
    app =                   express(),
    session =               require('express-session'),
    bodyParser =            require('body-parser'),
    path =                  require('path'),
    logger =                require('morgan'),
    cookieParser =          require('cookie-parser'),
    mongoose =              require('mongoose'),
    methodOverride =        require('method-override'),
    flash =                 require('express-flash'),
    passport =              require("passport"),
    LocalStrategy =         require("passport-local").Strategy,
    crypto =                require('crypto'),
    User =                  require('./models/user.js');

passport.use(new LocalStrategy(function(username, password, done) {
  User.findOne({ username: username.toLowerCase() }, function(err, user) {
    if (err) return done(err);
    if (!user) return done(null, false, { message: 'Incorrect username.' });
    user.comparePassword(password, function(err, isMatch) {
      if (isMatch) {
        return done(null, user);
      } else {
        return done(null, false, { message: 'Incorrect password.' });
      }
    });
  });
}));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost/awss_survey');
mongoose.connect('mongodb://mp-user:greatscott2016@ds117869.mlab.com:17869/mwm-meal-planner');

// ===== Middleware =====
app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "ejs");
// app.use(favicon(path.join(__dirname, 'public', 'images/gnci.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(session({
  secret: 'food, its whats for dinner',
  resave: true,
  saveUninitialized: true
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, "public"))); //__dirname value is the directory where the app.js script lives
app.use(methodOverride("_method"));


// ===== PASSPORT config =====
app.use(require("express-session")({
  secret: "My wife Stacie is gorgeous :)",
  resave: true,
  saveUninitialized: true
}));

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
  // res.locals.currentRoute = req.route;
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");
   res.locals.info = req.flash("info");
   next();
});

// ===== Route Variables =====
var indexRoutes =       require("./routes/index.js"),
    dashboardRoutes =   require("./routes/dashboard.js"),
    reactRoutes =       require("./routes/react.js"),
    surveyRoutes =      require("./routes/survey.js"),
    assetRoutes =       require("./routes/asset.js");

app.use(indexRoutes);
app.use(dashboardRoutes);
app.use(reactRoutes);
app.use(surveyRoutes);
app.use(assetRoutes);

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Server started");
});