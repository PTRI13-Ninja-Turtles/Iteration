

const calc = {}

// retreive rates prior to invoking this middleware
calc.stateYTDCalc = (req, res, next) => {
    // need to know:
        // User
            // state 
            // filing status
            // YTD Net Earnings

    const location = res.locals.user.state
    const filingStatus = res.locals.user.filingStatus
    const netIncome = Number(res.locals.user.estimatedIncome) - Number(res.locals.user.businessExpenses)

    const filingBrackets = res.locals.user.brackets

   // yadda yadda ya
   // output is a number

}


module.exports = calc;