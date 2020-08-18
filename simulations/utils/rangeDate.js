// import Utils from './dateUtils';

dt = new Date();
let firstDate = new Date('December 11, 1996');
let secondDate = new Date('September 11, 2000');

let startYear;
let endYear;
let startMonth;
let endMonth;
var datesArr = [];
var datesOfPurchase = [];

const rangeUtils = {

    // ---- Finding the Frequencies ------------------
    //  Take in start and end dates, return frequency

    // // return amount of bi-weeks - push to frequency
    // allBiWeekDates(startDate, endDate) {
    //     // need to determine the dates of purchase for bi-weekly
    //     datesOfPurchase.push(result);
    //     amtEach(datesOfPurchase, totalAmt);
    // },

    // // return amount of months - push to frequency
    // allMonthDates(startDate, endDate) {
    //     // need to determine the dates of purchase for monthly
    //     datesOfPurchase.push(result);
    //     amtEach(datesOfPurchase, totalAmt);
    // },

    // // return amount of quarters - push to frequency
    // allQuarterDates(startDate, endDate) {
    //     // need to determine the dates of purchase for quarterly
    //     datesOfPurchase.push(result);
    //     amtEach(datesOfPurchase, totalAmt);
    // },
    // // ------------------------------------------------- 

    // Function returns the first date of your current month


    startOfMonth() {
        
        console.log("dates of Purchase: " + datesOfPurchase);
        // console.log(new Date(date.getFullYear(), date.getMonth(), 1).toLocaleDateString());
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

    if (startYear <= endYear) {
        addDate(startMonth, startYear);

    } 
}

// takes in the start month and year and returns the date
// as a string to send to the buy suggestion 
function addDate(startMonth, startYear) {
    if (startMonth < 10){

    // create the new date to push
    var newDate = (startYear +"-0"+ startMonth+"-01");
    console.log("newDate = " + newDate);

    // push new date into dates array
    datesOfPurchase.push(newDate).toString();
    console.log("datesOfPurchase = " + datesOfPurchase);

        // if (startMonth <= 12) {
        // // increment startMonth
        // startMonth = parseInt(startMonth) + 1;
        // console.log("new start year/mo = " +startYear+"-"+ startMonth );
        // } else {
        //     console.log("unchanged start year = " +startYear)
        //     startYear = parseInt(startYear) +1;
        //     startMonth = 1;
        //     console.log("new start year = " +startYear)
        //     // console.log("new start year/mo = " +startYear+"-"+ startMonth )
        // }
    
    } else if ((startMonth >= 10) && (startMonth <= 12)) {

    var newDate = (startYear +"-"+ startMonth+"-01");
    console.log("newDate = " + newDate);

    } else if (startMonth = 12) {
        console.log("unchanged start year = " +startYear)
            startYear = parseInt(startYear) +1;
            startMonth = 1;
            console.log("new start year = " +startYear)
            // console.log("new start year/mo = " +startYear+"-"+ startMonth )
    }


}


module.exports = rangeUtils;

rangeUtils.startOfMonth();