const tables = require('../models/pgModels.js')

const data = {}

data.stateBrackets = (req, res, next) =>{
  console.log ("State Brackets Middleware accessed");
  const { state, filingStatus } = res.locals;
  console.log ('Value of state in StateBrackets', state);
  console.log (filingStatus);
  const query = {
       text: `
        SELECT *
        FROM tax_rates
        WHERE state_name = $1
          AND filing_status = $2`,
          values: [state, filingStatus],
        };
    console.log ('res.locals.tables destructured and query created.')

  tables.query(`SELECT * FROM tax_rates WHERE state_name = ${'california'} AND filing_status = ${'single'}`)
    .then((data) =>{
        res.locals.stateTables = data.rows;
        console.log('tables fetched ' + data.rows)
        return next()
    })
    .catch((err) => {
        console.log('Error in DataRetrieval controller!' + err)
        return next(err)
    })

}


module.exports = data
