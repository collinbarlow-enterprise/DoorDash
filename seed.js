require('dotenv').config();
require('./config/database');

const Restaurant = require('./models/restaurant');

const data = require('./restaurantData');

const p1 = Restaurant.deleteMany({});

Promise.all([p1]).then(function(results) {
    console.log(results);
    return Restaurant.create(data.restaurants);
})
.then(function(restaurants) {
    console.log(restaurants);
})
.then(process.exit);