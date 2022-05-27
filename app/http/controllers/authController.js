/* eslint-disable space-before-function-paren */
/* eslint-disable indent */
/* eslint-disable semi */

function authController() {
    return {
        register(req, res) {
            return res.status(200).render('auth/register');
        },

        login(req, res) {
            return res.status(200).render('auth/login');
        }
    }
};

module.exports = authController;
