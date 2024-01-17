// Middleware for user signup & sign in
const express = require('express');
const userController = require('../Controllers/User');
const data = require('../Controllers/DataRetrieval');
const authController = require('../controllers/authController');
const router = express.Router();


router.post('/', authController.signupUser, authController.loginUser, userController.newUser, data.stateBrackets,  (req, res) =>{
  res.status(200).json(res.locals);
});




module.exports = router;
