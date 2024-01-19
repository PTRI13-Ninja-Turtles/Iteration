const userModels = require('../models/mongooseModels');

const userController = {};

userController.newUser = (req, res, next) => {

  const { firstName,
    lastName,
    password,
    filingStatus,
    state,
    industry,
    email,
    estimatedIncome,
    businessExpenses,
    preTaxRetirementContributions
  } = req.body;

  userModels.Person.create({
    firstName,
    lastName,
    password,
    filingStatus,
    state,
    industry,
    email,
    estimatedIncome,
    businessExpenses,
    preTaxRetirementContributions
  })
    .then((data) => {
      console.log ('Value of state from the mongo query', data.state);
      res.locals.state = data.state;
      res.locals.filingStatus = data.filingStatus;
      res.locals.estimatedIncome = data.estimatedIncome;
      res.locals.businessExpenses = data.businessExpenses;
      res.locals.preTaxRetirementContributions = data.preTaxRetirementContributions;
      console.log('sucessfully created the document in MongoDB' + data);
      return next();
    })
    .catch((err) => {
      console.log('Error in User Controller' + err);
      return next(err);
    });
};

userController.findUser = (req, res, next) => {
  //dont know what the value is here. 
  const email = req.user;

  userModels.Person.findOne({email}).exec()
    .then (response => {
      res.locals.userFound = response;
      console.log ('User has been found by token verification', response);
      return next();
    })
    .catch((err) => {
      console.log('Error in User Controller' + err);
      return next(err);
    });

};
module.exports = userController;