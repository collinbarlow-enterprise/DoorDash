const User = require('../../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');

module.exports = {
  create,
  login
}

async function create(req, res){
  try {
    console.log('made it to create controller')
    const user = await User.create(req.body)
    const token = createJWT(user)
    res.json(token)
  } catch (error) {
    console.log(error, 'error here')
    res.status(400).json(error)
  }
}

function createJWT(user){
  return jwt.sign(
    {user},
    process.env.SECRET,
    { expiresIn: '24hr'}
  )
}

async function login(req, res) {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) throw new Error();
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) throw new Error();
    res.json( createJWT(user) );
  } catch {
    res.status(400).json('Bad Credentials');
  }
}