const mongoose = require('mongoose');
const MONGO_URI = 'mongodb+srv://moisesgomezr9:L37udLyPOFIfqRtM@scratch-project.j3hrygw.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(MONGO_URI, {
  // options for the connect method to parse the URI
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // sets the name of the DB that our collections are part of
  dbName: 'scratch-project'
})
  .then(() => console.log('Connected to Mongo DB.'))
  .catch(err => console.log(err));

const Schema = mongoose.Schema;

const incomeSchema = new Schema({
  source: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now }
});

const expenseSchema = new Schema({
  source: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now }

});

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

const Person = mongoose.model('person', personSchema);

module.exports = Person;