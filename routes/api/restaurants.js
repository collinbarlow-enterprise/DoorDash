const express = require('express');
const router = express.Router();
const restaurantCtrl = require('../../controllers/api/restaurants');

const ensureLoggedIn = require('../../config/ensureLoggedIn')

//get restaurants
router.get('/', restaurantCtrl.getRestaurant)

// get one restaurant
router.get('/getOneRestaurant/:id', restaurantCtrl.findSpecificRestaurant)

// get menuItem
router.get('/getMenuItem/:id/:menuId', restaurantCtrl.findSpecificMenuItem)

module.exports = router;