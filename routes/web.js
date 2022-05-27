/* eslint-disable space-before-function-paren */
/* eslint-disable indent */
/* eslint-disable semi */
const homeController = require('../app/http/controllers/homeController');

function initRoutes(app) {
    app.get('/', homeController().index);
};

module.exports = initRoutes;
