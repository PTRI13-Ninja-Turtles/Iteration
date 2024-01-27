const express = require('express');
const session = require('express-session');
const userController = require('../Controllers/User');
const data = require('../Controllers/DataRetrieval');
const authController = require('../Controllers/authController'); 
const models = require('../models/mongooseModels');  
const router = express.Router();


router.post('/', authController.loginUser, /*more middleware maybe?*/(req, res) =>{
//figure out what goes here
});

module.exports = router