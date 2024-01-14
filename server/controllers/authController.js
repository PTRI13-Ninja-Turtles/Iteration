const Person = require('../models/mongooseModels'); 

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