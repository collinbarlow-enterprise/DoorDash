const { Restaurant, MenuItem } = require('../../models/restaurant');
const User = require('../../models/user')

// what crud activities do I need?

// getting restaurant data
// CRUD (create, read, update, delete)
// I wont be creating a restaurant, I wont be updating or deleting either from the user workflow. Just reading as it stands right now. The update, and delete function would come in as an option for a different kind of profile

// does the cart functionality live here? what about the order functionality? how does that tie into the restaurants controller?

module.exports = {
    getRestaurant,
    findSpecificRestaurant,
    findSpecificMenuItem
    
}

async function getRestaurant(req, res) {
    console.log('made it inside restaurant CONTROLLER')
    try {
    const restaurants = await Restaurant.find({})
    // console.log(restaurants, 'restaurants in getRestaurant controller')
    res.json(restaurants);
    } catch(error) {
        console.log(error, 'error in getRestaurantController')
    }
}

async function findSpecificRestaurant(req, res) {
    console.log('made it inside findSpecificRestaurant CONTROLLER')
    const restaurant = await Restaurant.findById(req.params.id);
    res.json(restaurant);
}

async function findSpecificMenuItem(req, res) {
    console.log(req.params.id, 'req.params in findSpecificMenu CONTROLLER')
    console.log('made it inside findSpecific Menu Item CONTROLLER')
    const menuItem = await MenuItem.findById(req.params.id);
    console.log(menuItem, 'menuItem in find specific MENU ITEM CONTROLLER')
    res.json(menuItem)
}