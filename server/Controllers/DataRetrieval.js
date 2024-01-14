const tables = require('../models/pgModels.js')

const data = {}

data.stateBrackets = (req, res, next) =>{
  const { state, filingStatus } = res.locals.tables;
  const query = {
       text: `
        SELECT *
        FROM tax_rates
        WHERE state_name = $1
          AND filing_status = $2`,
          values: [state, filingStatus],
        };

  tables.query(query)
    .then((data) =>{
        res.locals.tables.stateTables = data.rows;
        console.log('tables fetched ' + data.rows)
        return next()
    })
    .catch((err) => {
        console.log('Error!' + err)
        return next(err)
    })

}


module.exports = data
