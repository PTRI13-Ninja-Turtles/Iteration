const Person = require('../models/mongooseModels');  
const jwt = require('jsonwebtoken'); 
 
// this creates json web token
const createToken = (_id) => {
  return jwt.sign({_id}, process.env.SECRET, {expiresIn: '1d'});
};

// signup user 
const signupUser = async (req, res) => { 

  const { email, password } = req.body;
  // try to sign user up using signup method 
  try {
    const user = Person.signup(email, password);  

    // create a token 
    const token = createToken(user._id);

    res.status(200).json({email, token});
  } catch (error) {
    res.status(400).json({error: error.message});
  }
}; 

// login user 
const loginUser = async (req,res) => { 
  const { email, password } = req.body; 
  try {
    const user = Person.login(email, password);  

    // create token
    const token = createToken(user._id);

    res.status(200).json({email, token});
  } catch (error) {
    res.status(400).json({error: error.message});
  }

}; 

module.exports = { loginUser, signupUser };