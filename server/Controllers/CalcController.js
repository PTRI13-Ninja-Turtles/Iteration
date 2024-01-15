/* 
res.locals.stateTables <-- and array of objects with table information.
Each object element consists of {
                                    state_name:
                                    filing_status:
                                    income_range_low:
                                    income_range_high:
                                    tax_rate:
                                 }

Still need to fetch YTD & transaction data
*/ 



const calc = {};

// retreive rates prior to invoking this middleware
calc.stateYTDCalc = (req, res, next) => {

  const YTD = res.locals.estimatedIncome - (res.locals.businessExpenses + res.locals.preTaxRetirementContributions); // <-- property needs to be added
  const bracketLow = res.locals.stateTables.forEach((ele) => {ele[income_range_low]});
  const bracketHigh = res.locals.stateTables.forEach((ele) => {ele[income_range_high]});
  const rates = res.locals.stateTables.forEach((ele) =>{ele[tax_rate]});
  let taxesOwed = 0;

// edge case, flat rate

  if (bracketHigh[0] === 999999999){
    taxesOwed = YTD * rates[0];
  } else {
    for (let i=0; i<brackets.length; i++){
      const min = bracketLow[i];
      const max = bracketLow[i+1];
      const currentRate = rates[i];

      if (max === undefined){
        taxesOwed += ((YTD - min) * currentRate);
      } else if (YTD <= max){
        taxesOwed += ((YTD - min) * currentRate);
        break;
      } else {
        taxesOwed += ((max-min) * currentRate);
      }
    }
  }

  res.locals.taxesOwed.state = taxesOwed;
  return next();
}



module.exports = calc;