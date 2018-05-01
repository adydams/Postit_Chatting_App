const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

//set-up express
const app = express();

//use to log to console 
app.use(logger('dev'));

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Require our routes into the application.
require('./server/routes')(app);

//catch all routes
app.get('*', (req, res)=>{
    res.status(200).send({message:'Welcome To Default Route'});
});

module.exports = app;