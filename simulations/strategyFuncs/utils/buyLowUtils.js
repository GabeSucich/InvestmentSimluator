const Suggestion = require("./Suggestion")

const Utils = {


    // function takes in date range determines current high price
    findBuyDate(stockData, currentDate) {
        var highPrice = 0;
        var buyPrice = highPrice * 0.95;
        const dateArr = Object.keys(stockData)
        const buyDate = [];

        // iterate through dates
        for (const date of dateArr) {

            // find the price for each day
            const currentPrice = eval(stockData[currentDate]["markPrice"]);

            // if that price is greater than the previous day, make new high
            if ( currentPrice > highPrice){
                highPrice = currentPrice;
            }

            // if the current price is 5% less than high price - push date
            if ( currentPrice <= buyPrice) {
                buyDate.push(currentDate);

                // once it finds the first dip date, stop searching
                return buyDate;
            }
        }
    } 
}
export default Utils;