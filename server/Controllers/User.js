const userModels = require('../models/mongooseModels');

const userController = {};

userController.newUser = (req, res, next) => {

  /* Originally the implementation here was that we would create the document in the database using the Person model in this 
  middleware function. Instead we will move the creation of the document at the end of the middleware chain since we do not 
  have all the data we need just from the request body. We would still need the calculations for taxes and that is done further
  down the middleware chain, we will embed that data onto the document once retrieved*/

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

  res.locals.state = state;
  res.locals.filingStatus = filingStatus;
  res.locals.estimatedIncome = estimatedIncome;
  res.locals.businessExpenses = businessExpenses;
  res.locals.preTaxRetirementContributions = preTaxRetirementContributions;

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
  const id = req.user._id;
  console.log ('ID FOUND IN THE TOKEN FROM FIND USER CONTROLLER', id);

  userModels.Person.findById(id).exec()
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