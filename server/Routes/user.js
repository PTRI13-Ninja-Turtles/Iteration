// Middleware for user signup & sign in
const express = require('express')
const userController = require('../Controllers/User')

const router = express.Router()

router.post('/', userController.newUser, (req, res) =>{
    res.status(200).json()
})

router.get()


module.exports = router