// Middleware for user signup & sign in
const express = require('express')
const userController = require('../Controllers/User')
const data = require('../Controllers/DataRetrieval')
const authController = require('../controllers/authController');
const calc = require('../Controllers/CalcController')
const router = express.Router()


router.post('/', authController.signupUser, authController.loginUser, userController.newUser, data.stateBrackets, data.fedBrackets, calc.allTaxes, (req, res) =>{
  res.status(200).json(res.locals)//.redirect();
});



module.exports = router