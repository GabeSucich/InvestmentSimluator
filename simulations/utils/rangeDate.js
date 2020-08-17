// import Utils from './dateUtils';


const datesOfPurchase = [];
dt = new Date(); 

const rangeUtils = {

     // ---- Finding the Frequencies ------------------
    //  Take in start and end dates, return frequency

    // return amount of bi-weeks - push to frequency
    allBiWeekDates(startDate, endDate) {
        // need to determine the dates of purchase for bi-weekly
        datesOfPurchase.push(result);
        amtEach(datesOfPurchase, totalAmt);
    },

    // return amount of months - push to frequency
    allMonthDates(startDate, endDate){
          // need to determine the dates of purchase for monthly
        datesOfPurchase.push(result);
         amtEach(datesOfPurchase, totalAmt);
    },

    // return amount of quarters - push to frequency
    allQuarterDates(startDate, endDate){
         // need to determine the dates of purchase for quarterly
         datesOfPurchase.push(result);
         amtEach(datesOfPurchase, totalAmt);
    },
    // ------------------------------------------------- 
    
    // Function returns the first date of your current month
    
    
    startOfMonth(date){
       
        console.log(new Date(date.getFullYear(), date.getMonth(), 1).toLocaleDateString());
   
    }

}

module.exports = rangeUtils; 

rangeUtils.startOfMonth(dt);