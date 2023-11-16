const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const SALT_ROUNDS = 6;
const bcrypt = require('bcrypt')

// add first name, last name, address, and credit card to sign up form
// need to reformat entire sign up form, not a big deal just change fields and what data value they map to

const userSchema = new Schema({
  firstName: {type: String, required: false},
  lastName: {type: String, required: false},
  address: { type: String, required: false},
  creditCard: {type: Number, required: false, length: 9},
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
module.exports = mongoose.model('User', userSchema);
