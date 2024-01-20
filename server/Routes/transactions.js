// Middleware for transactions
const calc = require('..Controllers/CalcController')
const userController = require('../Controllers/User')
const data = require('../Controllers/DataRetrieval')
const authController = require('../Controllers/authController'); 
const calc = require('../Controllers/CalcController')

const express = require('express')

const router = express.Router()

// verify user √ -> find user √ -> grab state & local brackets √->
// store current YTD earnings, deductions & taxes on res.locals object √->
// calc all taxes. √-> update user with new totals -> calc difference between new totals √->
// return new totals and calced difference.
router.post('/', authController.verifyToken, userController.findUser, calc.newNumbers, calc.storage, data.stateBrackets, data.fedBrackets , calc.allTaxes, calc.transactionOwed, (req, res) =>{
    res.status(200).json(res.locals);
})

module.exports = router