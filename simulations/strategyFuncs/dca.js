const Suggestion = require('./utils/Suggestion');

// Strategy that will periodically purchase stocks / mutual funds
function dollarCostAverage(userFrequency, totalAmtInvest, c, symbol, portfolio, stockData, currentDate) {
console.log(`Date: ${currentDate}, Portfolio: ${portfolio.totalValue}`);

// "Global" variables
const suggestions = [];
const frequency = 0;
const totalAmt = totalAmtInvest;


// -------------------------
// Needed info from User:
// 1) Time Frame (start & end date)
// 2) Frequency of purchase (i.e. bi-weekly; monthly; quarterly)
// 3) Total amount to be invested (i.e. $12,000)
// 4) What stock / mutual fund to purchase

// Amount per purchase = Total Amount / Total Frequencies 
// -------------------------

// -- Switch Case to call specific frequency evaluation -- // 
switch(userFrequency) {
    case "bi-weekly":

    

}

}
// --------------------------------------------------------// 

// ---- Finding the Frequencies ---- // 
//  Take in dates, return frequency  //

// Determine the Amount of Weeks 

// Determine the Amount of Months

// Determine the Amount of Quarters

// ----------------------------------// 


// ---- Amt Per Purchase ---- // 
//  Take in totalAmt & frequency; returns amt/purchase  //

// Total Amt / Frequency = Amt per purchase 

// ----------------------------// 

// ---- Create the purchase Simulations ---- // 
//  Take in totalAmt & frequency; returns amt/purchase  //

// Total Amt / Frequency = Amt per purchase 

// ----------------------------// 




module.exports = {
    "name": "dollarCostAverage",
    "function": dollarCostAverage,
}