const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
//const Book = require('../models/books');
//const Order = require('../models/orders');

const authController = require('../controllers/auth');

router.post('/signup', authController.signup );

router.post('/login',authController.login);
// logout user
router.get('/logout', (req,res) => {
    req.logout()
    res.redirect('/')

})

module.exports = router;
