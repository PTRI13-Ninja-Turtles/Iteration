const express = require('express');
const session = require('express-session');
const userController = require('../Controllers/User');
const data = require('../Controllers/DataRetrieval');
const authController = require('../Controllers/authController'); 
const models = require('../models/mongooseModels');  
const router = express.Router();

/*
authcontroller.login <-- does it work?
get user information from MongoDB <-- authcontroller.login
Start a session <-- authcontroller.verify token
*/

router.post('/', authController.loginUser/*, authController.verifyToken*/, (req, res) =>{
  res.status(200).send(res.locals).redirect('/dashboard');
});

module.exports = router