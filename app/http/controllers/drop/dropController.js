/* eslint-disable space-before-function-paren */
/* eslint-disable indent */
/* eslint-disable semi */

function dropController() {
    return {
        drop(req, res) {
            return res.status(200).render('drop/drop');
        }
    }
};

module.exports = dropController;
