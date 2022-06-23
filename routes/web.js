/* eslint-disable space-before-function-paren */
/* eslint-disable indent */
/* eslint-disable semi */

// Controllers
const authController = require('../app/http/controllers/authController');
const homeController = require('../app/http/controllers/homeController');
const userController = require('../app/http/controllers/userController');
const dropController = require('../app/http/controllers/drop/dropController');
const folderController = require('../app/http/controllers/drop/folderController');

// Middlewares
const guest = require('../app/http/middleware/guest');
const uploadMS = require('../app/http/middleware/uploadMS');
const uploadFirebase = require('../app/http/middleware/uploadFirebase');

function initRoutes(app) {
    app.get('/', homeController().index);

    // Auth routes
    app.get('/login', guest, authController().loginPage);
    app.post('/login', authController().login);
    app.post('/logout', authController().logout);
    app.get('/register', guest, authController().registerPage);
    app.post('/register', authController().register);
    app.post('/user-edit/check-password', userController().checkPassword);
    app.post('/user-edit', uploadMS, uploadFirebase, userController().editUser);

    // Routes
    app.get('/drop', dropController().drop);
    app.post('/folder/create', folderController().createFolder);
    app.get('/folders', folderController().getFolders);
};

module.exports = initRoutes;
