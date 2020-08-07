const passport = require('passport');
const User = require('../../models/User');

module.exports = (() => {
  passport.serializeUser((user, done) => {
    done(null, user.username);
  });

  passport.deserializeUser((username, done) => {
    console.log('deserialize')
    User.findByUserName(username)
      .then((user) => {
        console.log(user);
        console.log(done);
        return done(null, user);
      })
      .catch((err) => {
        return done(err, null);
      });
  });

  return passport;
})();
