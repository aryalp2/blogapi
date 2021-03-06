// server.js
const express = require('express');
const mongoose = require('mongoose');
const config = require('./app/config');
const router = require('./app/router');
const cors = require('cors');


const app = express();

app.use(cors());

app.use(express.json());

if(process.env.NODE_ENV === "test") {
    app.set('port', config.test_port);
    app.listen(app.get('port'), err => {
        if(err) console.error(err);
        console.log(`Server listening on port ${app.get('port')}...`);
        const db = mongoose.connect(config.test_db);
    });
    } else {
    app.set('port', config.port);
    app.listen(app.get('port'), err => {
        if(err) console.error(err);
        console.log(`Server listening on port ${app.get('port')}...`);
        const db = mongoose.connect(config.db);
        mongoose.connection.on('connected', () => {
        console.log(`Mongoose connected to ${config.db}`);
        });
    });
}

router(app);

// needed for testing porpoises only
module.exports = app;