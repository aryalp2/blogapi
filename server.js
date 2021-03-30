const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const config = require('./app/config');
const router = require('./app/router');

const app = express();

app.use (express.json());


app.set('port', config.port);
app.listen(app.get('port'), err => {
    if (err) console.log(err);
    console.log(`Server is listening to ${app.get('port')}`);
    const db = mongoose.connect(config.db);
    mongoose.connection.on('connected' , () => {
        console.log(`MonGoose is connected to ${config.db}`);
    });
});

router (app);