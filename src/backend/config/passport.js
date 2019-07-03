const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../model/User");

passport.use(
  new LocalStrategy(
    {
      usernameField: "user[email]",
      passwordField: "user[password]"
    },
    function(email, password, done) {
      User.findOne({ email })
        .then(function(user) {
          // console.log(user);
          if (!user || !user.validPassword(password)) {
            return done(null, false, {
              errors: { "email or password": "is invalid" }
            });
          }
          return done(null, user);
        })
        .catch(done);
    }
  )
);

module.exports = passport;
