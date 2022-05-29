/* eslint-disable space-before-function-paren */
/* eslint-disable indent */
/* eslint-disable semi */

const bcrypt = require('bcrypt');

function userController() {
    return {
        checkPassword(req, res) {
            const user = req.user; // Get user from session
            const password = req.body.password;
            bcrypt
                .compare(password, user.password)
                .then(match => {
                    if (!match) return res.status(404).json({ message: 'Your password is wrong', status: match });
                    return res.status(200).json({ message: 'Password match', status: match })
                })
                .catch(() => {
                    return res.status(404).json({ message: 'Somthing went wrong' });
                });
        }
    }
};

module.exports = userController;
