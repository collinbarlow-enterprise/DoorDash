const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const SALT_ROUNDS = 6;
const bcrypt = require('bcrypt');
const axios = require ('axios');

// add first name, last name, address, and credit card to sign up form
// need to reformat entire sign up form, not a big deal just change fields and what data value they map to

// does the restaurant/business owner profile live here too? If so, need to incorporate some way of signfiying that (probably a different sign in, that has a different ternary option on the home page if the user has a user.businessOwner field marked as a boolean?)

const userSchema = new Schema({
  firstName: {type: String, required: false},
  lastName: {type: String, required: false},
  address: [{ type: String, required: false, default: '303 2nd Street San Francisco, CA 94107'}],
  location: {
    type: {type: String, default: 'Point',
    coordinates: {type: [Number], default: [0, 0]},},
  },
  creditCard: [{type: Number, required: false, length: 9, default: '111222333'}],
  chaseMember: {type: Boolean, required: true},
  favoriteRestaurant: [{type: Schema.Types.ObjectId, ref: 'Restaurant'}],
  orders: [{type: Schema.Types.ObjectId, ref: 'Order'}],
  email: {
    type: String,
    unique: true,
    trim: true,
    lowercase: true,
    required: true
  },
  password: {
    type: String,
    trim: true,
    minLength: 3,
    required: true
  }
}, 

{
  timestamps: true,
  toJSON: {
    transform: function(doc, ret) {
      delete ret.password;
      return ret;
    }
  }
});

userSchema.pre('save', async function(next) {
  // 'this' is the user doc
  if (!this.isModified('password')) return next();
  // update the password with the computed hash
  this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
  return next();
});

userSchema.methods.geocodeAddress = async function () {
  const user = this;
  console.log(user, 'user in geocodeAddress')
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(user.address)}&key=YOUR_API_KEY`
    );

    const { lat, lng } = response.data.results[0].geometry.location;

    // Update user's location in the database
    await this.model('User').findByIdAndUpdate(user._id, {
      location: {
        type: 'Point',
        coordinates: [lng, lat],
      },
    });

    console.log(user.location, 'User location updated successfully.');
  } catch (error) {
    console.error('Error updating user location:', error.message);
  }
};

module.exports = mongoose.model('User', userSchema);
