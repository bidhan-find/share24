/* eslint-disable space-before-function-paren */
/* eslint-disable indent */
/* eslint-disable semi */

// Controllers
const authController = require('../app/http/controllers/authController');
const homeController = require('../app/http/controllers/homeController');

// Middlewares
const guest = require('../app/http/middleware/guest');

function initRoutes(app) {
    app.get('/', homeController().index);

    // Auth routes
    app.get('/login', guest, authController().loginPage);
    app.post('/login', authController().login);
    app.get('/register', guest, authController().registerPage);
    app.post('/register', authController().register);
};

module.exports = initRoutes;
