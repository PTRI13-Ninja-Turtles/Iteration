// process.env.SECRET = '7hDkL$2pA!sFg@9rJm&5tYiX';
require('dotenv').config();
const models = require('../models/mongooseModels');  
const jwt = require('jsonwebtoken'); 
const session = require('express-session');
const bcrypt = require('bcrypt');

 
// this creates json web token
const createToken = (_id) => { 
  if (!process.env.SECRET) {
    throw Error('Secret key is missing. Make sure process.env.SECRET is defined.');
  }
  return jwt.sign({_id}, process.env.SECRET, {expiresIn: '30d'});
};

const authController = {};

// signup user 
authController.signupUser = async (req, res, next) => { 

  const { email } = req.body;

  console.log ('Email from the request body in jwt token creation', email);

  // try to sign user up using signup method 
  try {
    // const user = await models.Person.signup(firstName, lastName, password, email);  
    const user = await models.Person.findOne({email});

    console.log ('Found a user to create a token with their document id', user);

    // create a token 
    const token = createToken(user._id);

    res.cookie('access_token', token, { httpOnly: true });
    // Send the token as a cookie
    // res.cookie('token', token, {httpOnly: true});

    res.locals.token = token;


    //expires: new Date(Date.now() + 24 * 60 * 60 * 1000), secure: true, sameSite: 'Strict'

    return next();


    // res.status(200).json({email, token});
  } catch (error) {
    res.status(400).json({error: error.message});
  }
}; 

// login user 
authController.loginUser = (req, res, next) => { 
  console.log('are we here?? Line 54');
  const { email, password } = req.body; 

  // const user = await models.Person.login(email, password);  
  // const user = await models.Person.findOne({email});

  models.Person.findOne({ email }) 
    .then((user) => {
      // if (err) throw err;
      if (!user) {
        return res.status(401).send('Invalid email or password')
      }

      bcrypt.compare(password, user.password, (err,result) =>{
        if (err) throw err;
        if (result){
          res.locals.user = user;
        }
      });

      // res.locals.user = user;

      const token = createToken(user._id);
      console.log('this is the token:', token);
      res.cookie('access_token', token, { httpOnly: true });


      console.log('authController loginUser sucessful: ', res.locals.user);
      return next();
    })
    .catch((err) =>{
      console.log('error in the authController.loginUser middleware', err)
      return next(err);
    });


  // create token
  //   const token = createToken(user._id);

  //   res.status(200).json({email, token});
  //   return next();
  // } catch (error) {
  //   res.status(400).json({error: error.message});
  //   return next(error);
  // }

}; 

/* Controller that verifies token */

authController.verifyToken = (req, res, next) => {
  // Extract token from Authorization header
  const authorizationHeader = req.headers['authorization'];

  if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
    // Token not provided in the correct format
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const token = authorizationHeader.split(' ')[1];

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.SECRET);
    
    // Attach the decoded user information onto req.user
    req.user = decoded;
    
    console.log('THIS IS THE DATA DECODED', decoded);
    
    return next();
  } catch (error) {
    console.error('Token verification error:', error);
    return res.status(401).json({ error: 'Invalid token' });
  }
};


module.exports = authController;