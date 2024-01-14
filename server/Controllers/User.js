const userModels = require('../models/mongooseModels')

const userController = {}

/*
const personSchema = new Schema({
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  password: {type: String, unique: true, required: true},
  filingStatus: String,
  state: String,
  industry: String,
  email: String,
  estimatedIncome: Number,
  businessExpenses: Number,
  preTaxRetirementContributions: Number,
  incomes: [incomeSchema],
  expenses: [expenseSchema]
});
*/

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
    } = req.body

    userModels.create({
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
        console.log('sucessfully created' + data)
        res.locals.tables.state = state
        res.locals.tables.filingStatus = filingStatus
        return next()
    })
    .catch((err) => {
        console.log('Error' + err)
        return next(err)
    })
}


module.exports = userController