const express = require('express')

const router = express.Router();

const authController = require ('../Controllers/authController.js');


router.get('/', authController.verifyToken, (req, res, next) => {
    res.status(200).send('Made it through the verification of token')



});

module.exports = router;