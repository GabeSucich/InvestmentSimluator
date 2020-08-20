const Suggestion = require('./utils/Suggestion');

// Strategy that will periodically purchase stocks / mutual funds
function dollarCostAverage(
    // parameters 
    userFrequency,
    totalAmtInvest,
    startDate,
    endDate,
    symbol,
    portfolio,
    stockData,
    currentDate) {

    console.log(`Date: ${currentDate}, Portfolio: ${portfolio.totalValue}`);

    // "Global" variables
    const suggestions = [];
    const datesOfPurchase = [];
    const totalAmt = totalAmtInvest;
    let amtPerPurchase = 0;
   


    // -------------------------
    // Needed info from User:
    // 1) Time Frame (start & end date)
    // 2) Frequency of purchase (i.e. bi-weekly; monthly; quarterly)
    // 3) Total amount to be invested (i.e. $12,000)
    // 4) What stock to purchase 

    // Amount per purchase = Total Amount / Total Frequencies 
    // -------------------------


    // -- Switch Case to call specific frequency evaluation --  
    switch (userFrequency) {
        case "bi-weekly":
            allBiWeekDates(startDate, endDate);

        case "monthly":
            allMonthDates(startDate, endDate);

        case "monthly":
            allQuarterDates(startDate, endDate);
    }
    // -------------------------------------------------------- 


    // ---- Finding the Frequencies ------------------
    //  Take in start and end dates, return frequency

    // return amount of bi-weeks - push to frequency
    allBiWeekDates = (startDate, endDate) => {
        // need to determine the dates of purchase for bi-weekly
        datesOfPurchase.push(result);
        amtEach(datesOfPurchase, totalAmt);
    }

    // return amount of months - push to frequency
    allMonthDates = (startDate, endDate) => {
          // need to determine the dates of purchase for monthly
        datesOfPurchase.push(result);
         amtEach(datesOfPurchase, totalAmt);
    }

    // return amount of quarters - push to frequency
    allQuarterDates = (startDate, endDate) => {
         // need to determine the dates of purchase for quarterly
         datesOfPurchase.push(result);
         amtEach(datesOfPurchase, totalAmt);
    }
    // ------------------------------------------------- 


    // ---- Amt Per Purchase ------- 
    //  Take in totalAmt & frequency; returns amt/purchase  //

    amtEach = (datesOfPurchase, totalAmt) => {
        // Take in the amount of dates that purchases are made
        var frequencyAmt = datesOfPurchase.length;
        // Divide total amount by amount of dates of purchase
        let amtPerPurchase = totalAmt / frequencyAmt;
        buyStocks(amtPerPurchase, datesOfPurchase);
    }
    // ------------------------------



    // -------- Create the purchase Simulations --------------- 
    // Create a buy simulation for each date within frequency

    buyStocks = (amtPerPurchase, datesOfPurchase) => { 
        // for each date in datesOfPurchase
        // buy stock with amtPerPurchase
    }
    // --------------------------------------------------------- 



}


module.exports = {
    "name": "dollarCostAverage",
    "function": dollarCostAverage,
}