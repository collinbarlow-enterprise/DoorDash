//variables
console.log('hello')
const express = require('express');
const path = require('path');
const logger = require('morgan');
const winstonLogger = require('./src/utilities/logger.js');
const ensureLoggedIn = require('./config/ensureLoggedIn');

require('dotenv').config();
require('./config/database');

const app = express();

//middleware
app.use(logger('dev'));

// app.use((req, res, next) => { 
//   winstonLogger.http(`[HTTP] ${req.method} ${req.url}`);
//   next();
// })
app.use(express.json());
app.use(express.static(path.join(__dirname, 'dist')));

app.use(require('./config/checkToken'));

//routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/users/login', require('./routes/api/users'));

app.use('/api/restaurants', require ('./routes/api/restaurants'));
app.use('/api/orders', require('./routes/api/orders'));

app.use('/api/paidOrders', require('./routes/api/paidOrders'))

//catch all
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

//listener
const port = process.env.PORT || 3000;
console.log('made it to listener')
app.listen(port, function () {
  console.log(`Express app running on port ${port}`)
});