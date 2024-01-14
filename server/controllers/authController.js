const Person = require('../models/mongooseModels');  
const jwt = require('jsonwebtoken'); 
 
// this creates json web token
const createToken = (_id) => {
  jwt.sign({_id}, )
}

// login user 
const loginUser = async (req, res) => { 

  const { email, password } = req.body;
// try to sign user up using signup method 
  try {
    const user = Person.signup(email, password); 
    res.status(200).json({email, user});
  } catch (error) {
    res.status(400).json({error: error.message});
  }
}; 

// signup user 
const signupUser = async (req,res) => {

}; 

module.exports = { loginUser, signupUser };