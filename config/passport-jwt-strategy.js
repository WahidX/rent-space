const passport = require('passport');
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const env = require('./environment');

const User = require('../models/tenant');

let opts = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken,
  secretOrKey: env.jwt_secret,
};

passport.use(
  new JWTstrategy(opts, function (payload, done) {
    User.findById(payload._id, function (err, user) {
      if (err) {
        console.log('Error in finding in JWT : ', err);
        return;
      }

      if (user) {
        return done(null, user);
      } else {
        done(null, false);
      }
    });
  })
);

module.exports = passport;
