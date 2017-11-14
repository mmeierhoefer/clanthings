// ===== Mailer Middleware File =====

var mailObj =                       {},
    // nodemailer =                    require('nodemailer'),
    data =                          require('./data/data.js');

var smtpTransport =                 nodemailer.createTransport({
        // service: "Outlook365",
        host: 'smtp.sendgrid.net',
        port: 587,
        auth: {
          user: data.o365User,
          pass: data.o365Pass
        }
      });
    mailObj.smtpTransport =         smtpTransport;

var resetMail = {
        from: 'awss@gnciwireless.com',
        subject: 'GNCI iQ Portal Password Reset',
        };
    mailObj.resetMail =             resetMail;

module.exports = mailObj;