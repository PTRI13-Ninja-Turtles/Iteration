const userModels = require('../models/mongooseModels');

const userController = {};

userController.newUser = (req, res, next) => {

  /* Originally the implementation here was that we would create the document in the database using the Person model in this 
  middleware function. Instead we will move the creation of the document at the end of the middleware chain in a function called createUser
  since we do not have all the data we need just from the request body. We would still need the calculations for taxes and that is done further
  down the middleware chain, we will embed that data onto the document once retrieved.*/

  const {
    filingStatus,
    state,
    estimatedIncome,
    businessExpenses,
    preTaxRetirementContributions
  } = req.body;

  res.locals.state = state;
  res.locals.filingStatus = filingStatus;
  res.locals.estimatedIncome = estimatedIncome;
  res.locals.businessExpenses = businessExpenses;
  res.locals.preTaxRetirementContributions = preTaxRetirementContributions;

  return next();
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

userController.createUser = (req, res, next) => {

  const {
    filingStatus,
    state,
    estimatedIncome,
    businessExpenses,
    preTaxRetirementContributions
  } = res.locals;

  const {
    firstName,
    lastName,
    password,
    email,
    industry
  } = req.body;

  const medicareTax = res.locals.taxesOwed.medicare;
  const ssiTax = res.locals.taxesOwed.ssi;
  const fedTax = res.locals.taxesOwed.fed;
  const stateTax = res.locals.taxesOwed.stateTax;



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
    preTaxRetirementContributions,
    medicareTax,
    ssiTax,
    fedTax,
    stateTax
  })
    .then((data) => {
      console.log('sucessfully created the document in MongoDB' + data);
      return next();
    })
    .catch((err) => {
      console.log('Error in User Controller' + err);
      return next(err);
    });

};

userController.updateUser = (req, res, next) => {
  // update gross income, deduction & tax amounts, return per transaction tax values, create a transaction or deduction element on the array
  // req.body.type = earning || deduction
  let body = {};
  
  console.log ('Coming from updateUser middleware: result of req.body.type', req.body.type);

  if (req.body.type === 'earning'){
    body = {incomes: req.body};
  } else if (req.body.type === 'deduction'){
    body = {expenses: req.body};
  };

  // tax values for this transaction
  const { transMedicare, transSSI, transFed, transState } = res.locals.transactionOwed;
  // new YTD taxes owed
  const { medicare, ssi, fed, stateTax,} = res.locals.taxesOwed;
  // new YDT earnings and deductions
  const { estimatedIncome, businessExpenses } = res.locals.estimatedIncome;
  
  const id = req.user._id;
  const update = {
    estimatedIncome,
    businessExpenses,
    medicareTax: medicare,
    ssiTax: ssi,
    fedTax: fed,
    stateTax
  };

  console.log ('Coming from updateUser middleware: result of update Object', update);

  userModels.Person.findOneAndUpdate({id}, {$set: update, $push: body }).exec()
    .then(response => {
      console.log ('result of the response from updating the document in db', response);
      res.locals.responseFromUpdatingDocument})
    .catch (err => console.log (err));

  // req.user._id

  //serving to client: transactionOwed, responseFromUpdatingDocument

  //methods we can use: findAndUpdate? $push? 

  return next();
};

module.exports = userController;