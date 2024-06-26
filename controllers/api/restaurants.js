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
    // console.log('made it inside restaurant CONTROLLER')
    try {
    const restaurants = await Restaurant.find({})
    // console.log(restaurants, 'restaurants in getRestaurant controller')
    res.json(restaurants);
    } catch(error) {
        console.log(error, 'error in getRestaurantController')
    }
}

async function findSpecificRestaurant(req, res) {
    // console.log('made it inside findSpecificRestaurant CONTROLLER')
    try {
    const restaurant = await Restaurant.findById(req.params.id);
    res.json(restaurant);
} catch (error) {
    console.error(error);

    // Handle different types of errors and return appropriate status codes
    if (error.name === 'ValidationError') {
        return res.status(400).json({ error: 'Validation error' });
    }

    res.status(500).json({ error: 'Internal Server Error' });
}};

async function findSpecificMenuItem(req, res) {
    // console.log('MADE IT INSIDE FIND SPECIFIC MENUITEM ')
    console.log(req.body, 'req.body in findSpecificMenuItem')
    console.log(req.params, 'req.params in findSpecificMenu CONTROLLER')
    // console.log('made it inside findSpecific Menu Item CONTROLLER')

    try{
        const restaurant = await Restaurant.findById(req.params.id);
        console.log(restaurant, 'restaurant in SpecificMENU ITEM')

        const menuItemId = req.params.menuId;
        console.log(JSON.stringify(menuItemId));
        console.log(menuItemId, 'menuItemId in try block')
        // think its broken here if 
        // menuItem returns undefined
        // menuItemId is grabbed by params.menuId what is menuId
        const menuItem = restaurant.menu.find(item => item._id == menuItemId);
        console.log(menuItem, 'menuItem in CONTROLLER')

        res.json(menuItem);
    } catch(error) {
        console.log(error, 'error for findSpecificMenuItem')}
}