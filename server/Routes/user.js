// Middleware for user signup & sign in
const express = require('express')
const userController = require('../Controllers/User')
const data = require('../Controllers/DataRetrieval')

const router = express.Router()

router.post('/', userController.newUser, data.stateBrackets, (req, res) =>{
  res.status(200).json(res.locals)
})


module.exports = router