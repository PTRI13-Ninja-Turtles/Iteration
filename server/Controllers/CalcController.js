const calc = {};

calc.stateYTDCalc = (req, res, next) => {

  const YTD = res.locals.estimatedIncome - (res.locals.businessExpenses + res.locals.preTaxRetirementContributions); // <-- property needs to be added
  const bracketLow = res.locals.stateTables.forEach((ele) => {ele[income_range_low]});
  const bracketHigh = res.locals.stateTables.forEach((ele) => {ele[income_range_high]});
  const rates = res.locals.stateTables.forEach((ele) =>{ele[tax_rate]});
  let taxesOwed = 0;

  // 
  if (bracketHigh[0] === 999999999){
    taxesOwed = YTD * rates[0];
  } else {
    for (let i=0; i<bracketLow.length; i++){
      const min = bracketLow[i];
      const max = bracketHigh[i];
      const currentRate = rates[i];

      if (max === 999999999){
        taxesOwed += ((YTD - min) * currentRate);
      } else if (YTD <= max){
        taxesOwed += ((YTD - min) * currentRate);
        break;
      } else {
        taxesOwed += ((max - min) * currentRate);
      }
    }
  }

  res.locals.taxesOwed.state = taxesOwed;
  return next();
};

calc.fedYTDCalc = (req, res, next) => {
  const YTD = res.locals.estimatedIncome - (res.locals.businessExpenses + res.locals.preTaxRetirementContributions); // <-- property needs to be added
  const bracketLow = res.locals.fedTables.forEach((ele) => {ele[income_range_low]});
  const bracketHigh = res.locals.fedTables.forEach((ele) => {ele[income_range_high]});
  const rates = res.locals.fedTables.forEach((ele) =>{ele[tax_rate]});
  let taxesOwed = 0;

  for (let i=0; i<bracketLow.length; i++){

    const min = bracketLow[i]
    const max = bracketHigh[i]
    const currentRate = rates[i]

    if (max === 999999999){
      taxesOwed += ((YTD - min) * currentRate)
    } else if (YTD <= max){
      taxesOwed += ((YTD - min) * currentRate)
      break;
    } else {
      taxesOwed += ((max-min) * currentRate)
    }
}
  res.locals.taxesOwed.fed = taxesOwed;
  return next();
};

calc.SSYTDCalc = (req, res, next) => {
  const YTD = res.locals.estimatedIncome - (res.locals.businessExpenses + res.locals.preTaxRetirementContributions); // <-- property needs to be added
  let taxesOwed = 0;

  if (YTD < 400) {
    taxesOwed = 0;
  } else if (YTD > 160200){
    taxesOwed = 160200 * 0.124;
  } else {
    taxesOwed = YTD * 0.124;
  }

  res.locals.taxesOwed.SSI = taxesOwed;
  return next()
};

calc.medicareYTDCalc = (req , res, next) => {
  const YTD = res.locals.estimatedIncome - (res.locals.businessExpenses + res.locals.preTaxRetirementContributions); // <-- property needs to be added
  let taxesOwed = 0;
  taxesOwed = YTD < 400 ? 0 : YTD * 0.029;

  res.locals.taxesOwed.medicare = taxesOwed
  return next()
};

module.exports = calc;