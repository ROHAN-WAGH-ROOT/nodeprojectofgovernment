const signUp = require('./Model/signUp')

const LocalStrategy = require('passport-local').Strategy

exports.initializePassport = (passport) => {
    passport.use(new LocalStrategy(async (email, password, done) => {
        try {
            const user = await signUp.findOne({ email: email });
            console.log("user", user)
            if (!user) return done(null, false);
            if (user.passport !== password) return done(null, false);
            return done(null, user);
        } catch (error) {
            console.log(error)
            return error
        }
    }
    ));

    passport.serializeUser((user, done) => {
        done(null, user.id)
    });

    passport.deserializeUser(async (id, done) => {
        try {
            done(null, user);
        } catch (error) {
            done(error, false)
        }
    })
}