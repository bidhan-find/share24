/* eslint-disable indent */
/* eslint-disable semi */
// eslint-disable-next-line eol-last
require('dotenv').config();
const express = require('express');
// eslint-disable-next-line no-unused-vars
const ejs = require('ejs');
const expressLayout = require('express-ejs-layouts');
const path = require('path');
const app = express();
const port = process.env.PORT || 8000;

// Assets
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Set templete engine
app.use(expressLayout);
app.set('views', path.join(__dirname, '/resources/views'));
app.set('view engine', 'ejs');

// Web routes
require('./routes/web')(app);

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})
