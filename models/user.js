// ** Most of this setup comes from:  http://sahatyalkabov.com/how-to-implement-password-reset-in-nodejs/ **

var mongoose =                      require("mongoose"),
    passportLocalMongoose =         require("passport-local-mongoose"),
    bcrypt =                        require('bcrypt-nodejs');
    
var userSchema = new mongoose.Schema({
    username:   {
        type:               String,
        required:           true,
        unique:             true
    },
    password:   {
        type:               String,
        required:           true,
    },
    company:                String,
    name:                   String,
    survey:                 Boolean,
    react:                  Boolean,
    asset:                  Boolean,
    resetPasswordToken:     String,
    resetPasswordExpires:   Date
});

userSchema.pre('save', function(next) {
  var user = this;
  var SALT_FACTOR = 5;

  if (!user.isModified('password')) return next();

  bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};


module.exports = mongoose.model("User", userSchema);
