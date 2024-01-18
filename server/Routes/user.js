// Middleware for user signup & sign in
const express = require('express')
const userController = require('../Controllers/User')
const data = require('../Controllers/DataRetrieval')
//const authController = require('../controllers/authController'); 
const calc = require('../Controllers/CalcController')
const dashBoardRedirect = require('../Controllers/redirectController.js');
const router = express.Router()



// router.post('/', userController.newUser, dashBoardRedirect.dashboard, data.stateBrackets, data.fedBrackets, calc.allTaxes, (req, res) =>{
//   res.status(200).json(res.locals)//.redirect();
// });

router.post('/', userController.newUser, dashBoardRedirect.dashboard, (req, res) => {
  res.status(200);
});

module.exports = router;

//authController.signupUser, authController.loginUser,