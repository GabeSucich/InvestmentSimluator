// import Utils from './dateUtils';


const datesOfPurchase = [];
dt = new Date(); 
let firstDate = new Date('August 11, 1996');
let secondDate = new Date('September 11, 2000');

let startYear;
let endYear;
let startMonth;
let endMonth;

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
        firstDate = firstDate.toLocaleDateString().split('/');
        secondDate = secondDate.toLocaleDateString().split("/");
       
        startYear = firstDate[2];
        endYear = secondDate[2];
        startMonth = firstDate[0];
        endMonth = secondDate[0];

        console.log("startYear = " + startYear);
        console.log("endYear = " + endYear);
        console.log("startMonth = " + startMonth);
        console.log("endMonth = " + endMonth);



        calcMonths(startYear, endYear, startMonth, endMonth);
    },


}

function calcMonths(startYear, endYear, startMonth, endMonth) {
    yearDifference = endYear - startYear;
    monthDifference = endMonth - startMonth;

    console.log('year diff = ' + yearDifference);
    console.log('monthDiff = ' + monthDifference);

    
}



module.exports = rangeUtils; 

rangeUtils.startOfMonth(dt);