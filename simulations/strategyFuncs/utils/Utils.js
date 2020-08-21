const Utils = {

    maxStockPurchases(stockPrice, cashAmt) {
        return Math.floor(eval(cashAmt)/eval(stockPrice));
    },

    // function takes in date range determines current high price
    findBuyDate(stockData, currentDate) {
        console.log('findBuyDate running');
        var highPrice = 0;
        var buyPrice;
        const dateArr = Object.keys(stockData)

        // iterate through dates
        for (const date of dateArr) {


            // find the price for each day
            const currentPrice = eval(stockData[date]["markPrice"]);
            console.log('currentDay = ' + date + ' currentPrice = ' + currentPrice + ' highPrice = ' + highPrice + ' buyPrice = ' + buyPrice);

            // if that price is greater than the previous day, make new high
            if ( currentPrice > highPrice){
                highPrice = currentPrice;
                buyPrice = (highPrice * 0.95).toFixed(2);
            }

            // if the current price is 5% less than high price - push date
            if ( currentPrice <= buyPrice) {
                console.log('we gonna buy now boi');
              

                // once it finds the first dip date, stop searching
                console.log("buy date = " + date);
                return buyDate;
            }
        }
    } 
}
module.exports = Utils;