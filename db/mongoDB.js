/* eslint-disable space-before-function-paren */
/* eslint-disable indent */
/* eslint-disable semi */

const mongoose = require('mongoose');
const session = require('express-session');
const MongoDbStore = require('connect-mongo');

function databaseConnect(app) {
    // MongoDB connection
    const url = 'mongodb://127.0.0.1:27017/shre24';
    // const url = `mongodb+srv://${process.env.MONGO_username}:${process.env.MONGO_password}@cluster0.woggi.mongodb.net/${process.env.MONGO_collection}?retryWrites=true&w=majority`;
    mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    const connection = mongoose.connection;
    connection
        .once('open', function () {
            console.log('mongoDB connection successful');
        })
        .on('error', function (err) {
            console.log(err);
            console.log('mongoDB connection fail');
        });

    // Session config
    app.use(session({
        secret: process.env.session_secret,
        resave: false,
        store: MongoDbStore.create({
            mongoUrl: url
        }),
        saveUninitialized: false,
        cookie: { maxAge: 1000 * 60 * 60 * 24 } // 24 hours
    }));
}

module.exports = databaseConnect;
