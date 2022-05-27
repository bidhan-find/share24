/* eslint-disable indent */
/* eslint-disable semi */
// eslint-disable-next-line eol-last

require('dotenv').config();
const express = require('express');
// eslint-disable-next-line no-unused-vars
const ejs = require('ejs');
const expressLayout = require('express-ejs-layouts');
const path = require('path');
const flash = require('express-flash');
const app = express();
const passport = require('passport');
const port = process.env.PORT || 8000;

// Database connection
require('./db/mongoDB')(app);

app.use(flash());

// Passport contig
const passportInit = require('./app/services/passport');
passportInit(passport);
app.use(passport.initialize());
app.use(passport.session());

// Assets
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Global middleware
app.use((req, res, next) => {
    res.locals.session = req.session;
    res.locals.user = req.user;
    next();
});

// Set templete engine
app.use(expressLayout);
app.set('views', path.join(__dirname, '/resources/views'));
app.set('view engine', 'ejs');

// Web routes
require('./routes/web')(app);

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
});
