const Restaurant = require('../models/restaurant')
const User = require('../models/user')

// what crud activities do I need?

// getting restaurant data
// CRUD (create, read, update, delete)
// I wont be creating a restaurant, I wont be updating or deleting either from the user workflow. Just reading as it stands right now. The update, and delete function would come in as an option for a different kind of profile

// does the cart functionality live here? what about the order functionality? how does that tie into the restaurants controller?

module.exports = {
    getRestaurant,
    
}

async function getRestaurant(req, res) {
    const restaurants = await Restaurant.find({})
    console.log(restaurants, 'restaurants in getRestaurant controller')
    res.json(restaurants)
}