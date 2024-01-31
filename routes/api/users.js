// routes/api/users.js

const express = require('express');
const router = express.Router();
const usersCtrl = require('../../controllers/api/users');

// POST /api/users
router.post('/', usersCtrl.create);
router.post('/login', usersCtrl.login);

// post for drop off instructions
router.post(`/changeDropOffInstructions`, usersCtrl.changeInstructions);

module.exports = router;
