const express = require('express');
const router = express.Router();
const restaurantCtrl = require('../../controllers/restaurants');

const ensureLoggedIn = require('../../config/ensureLoggedIn')

//get restaruants
router.get('/'. restaurantCtrl.getRestaurant)