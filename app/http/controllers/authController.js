/* eslint-disable space-before-function-paren */
/* eslint-disable indent */
/* eslint-disable semi */

const bcrypt = require('bcrypt');
const User = require('../../models/User');
const passport = require('passport');

function authController() {
    return {
        loginPage(req, res) {
            return res.status(200).render('auth/login');
        },

        login(req, res, next) {
            const { email, password } = req.body;

            // Validate request
            if (!email || !password) {
                req.flash('error', 'All fields are required');
                return res.redirect('/login');
            };

            // Login by passport
            passport.authenticate('local', (err, user, info) => {
                if (err) {
                    req.flash('error', info.message);
                    return next(err);
                };

                if (!user) {
                    req.flash('email', email);
                    req.flash('error', info.message);
                    return res.redirect('/login');
                };

                req.logIn(user, (err) => {
                    if (err) {
                        req.flash('error', info.message);
                        return next(err)
                    };
                    return res.redirect('/')
                });
            })(req, res, next);
        },

        registerPage(req, res) {
            return res.status(200).render('auth/register');
        },

        async register(req, res) {
            const { name, email, password, confirmPassword } = req.body;

            // Validate request
            if (!name || !email || !password || !confirmPassword) {
                req.flash('error', 'All fields are required');
                req.flash('name', name);
                req.flash('email', email);
                return res.redirect('/register');
            };

            // Check confirm password are matching
            if (password !== confirmPassword) {
                req.flash('error', 'Your confirm password are not matching');
                req.flash('name', name);
                req.flash('email', email);
                req.flash('password', password);
                req.flash('confirmPassword', confirmPassword);
                return res.redirect('/register');
            };

            // Hash password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create a user
            const user = new User({ name, email, password: hashedPassword });
            user.save().then(() => {
                // Login auto in register
                return res.redirect('/login');
            }).catch(() => {
                req.flash('error', 'Something went wrong');
                return res.redirect('/register');
            });
        }
    }
};

module.exports = authController;
