const Suggestion = require('./utils/Suggestion');

// Strategy that will periodically purchase stocks / mutual funds
function dollarCostAverage(userFrequency, b, c, symbol, portfolio, stockData, currentDate) {
console.log(`Date: ${currentDate}, Portfolio: ${portfolio.totalValue}`);

// "Global" variables
const suggestions = [];
const frequency = 0;



// Needed info from User:
// 1) Time Frame (start & end date)
// 2) Frequency of purchase (i.e. bi-weekly; monthly; quarterly)
// 3) Total amount to be invested (i.e. $12,000)

// Amount per purchase = Total Amount / Total Frequencies 

switch(userFrequency) {
    case "bi-weekly":

    

}

}

module.exports = {
    "name": "dollarCostAverage",
    "function": dollarCostAverage,
}