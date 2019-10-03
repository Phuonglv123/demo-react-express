
var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
var opts = {}
// load model

const User = require('../../server/models/UserShareCar');
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';
module.exports = (passport) => passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    // console.log(jwt_payload);
    User.findById(jwt_payload.id)
        .then(user=> {
            if(user){
                return done(null, user)
            }
        })
        .catch(err => console.log(err));
}));
