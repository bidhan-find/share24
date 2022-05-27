/* eslint-disable space-before-function-paren */
/* eslint-disable indent */
/* eslint-disable semi */

const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../models/User');

function init(passport) {
    passport.use(
        new LocalStrategy(
            { usernameField: 'email' },
            async (email, password, done) => {
                // Login function
                // Check if email exists
                const user = await User.findOne({ email });
                if (!user) return done(null, false, { message: 'Somthing went worng!!!' });
                bcrypt
                    .compare(password, user.password)
                    .then(match => {
                        if (match) return done(null, user, { message: 'Looged in successfully' });
                        return done(null, false, { message: 'Wrong email or password' });
                    })
                    .catch(() => {
                        return done(null, false, { message: 'Somthing went worng!' });
                    })
            }
        )
    );

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });
};

module.exports = init;
