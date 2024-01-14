// Middleware for transactions
const calc = require('..Controllers/CalcController')

const express = require('express')

const router = express.Router()

router.get('/', calc.stateYTDCalc, (req,res) =>{
    router.send(200)//something
})


module.exports = router