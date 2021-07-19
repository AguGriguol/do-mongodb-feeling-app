const express = require('express');
const app = express();

//Database Connection
require('./database/database');
//DI
const container = require('./dependencies/index');
//Server Middlewares
require('./middlewares/server')(app, container);
//Routes
require('./routes/index')(app);

app.listen(process.env.API_PORT);
console.log('Feeling API listening on ' + process.env.API_PORT);

module.exports = app;
