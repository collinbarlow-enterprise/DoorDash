const express = require('express');
const router = express.Router();
const restaurantCtrl = require('../../controllers/api/restaurants');

const ensureLoggedIn = require('../../config/ensureLoggedIn')

//get restaruants
router.get('/', restaurantCtrl.getRestaurant)

module.exports = router;