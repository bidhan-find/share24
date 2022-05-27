/* eslint-disable space-before-function-paren */
/* eslint-disable indent */
/* eslint-disable semi */

function homeController() {
    return {
        async index(req, res) {
            return res.status(200).render('home');
        }
    }
};

module.exports = homeController;
