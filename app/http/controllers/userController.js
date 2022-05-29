/* eslint-disable space-before-function-paren */
/* eslint-disable indent */
/* eslint-disable semi */

const bcrypt = require('bcrypt');
const User = require('../../models/User');

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
        },

        async editUser(req, res) {
            // Check password is exist
            let newPassword;
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            if (!req.body.password) newPassword = req.user.password;
            else newPassword = hashedPassword;
            // Check image url is exist
            let imageUrl;
            if (!req.file) imageUrl = req.user.profileImage;
            else imageUrl = req.file.firebaseUrl;

            if (req.body.password !== req.body.confirmPassword) {
                return res.status(404).json({ error: 'Your confirm password are not matching' })
            }

            const user = await User.findOneAndUpdate({
                id: req.user._id
            }, {
                name: req.body.name,
                password: newPassword,
                profileImage: imageUrl
            }, { new: true });

            if (user) return res.status(200).json({ user });
        }
    }
};

module.exports = userController;
