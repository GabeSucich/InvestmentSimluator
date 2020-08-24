const ActiveUtils = {

    // takes in an integer (5) and returns the decimal equivalent subtracted from 100% (.95)
    calcPercentChange(percent) {
        var firstStep = 100 - percent;
        var secondStep = firstStep * 0.01;
        return secondStep;
    },


    // function takes in date range determines current high price
    findBuyDateLow(stockData, dateArr, percentDecrease) {
        console.log("activeUtils percent = " + parseInt(percentDecrease));
        console.log('findBuyDateLow running');
        var highPrice = 0;
        var buyPrice;
        const dateArr = dateArr;

        var percentOf = this.calcPercentChange(percentDecrease);
        //    console.log('percentOf dateUtils = ' + percentOf);

        // iterate through dates
        for (const date of dateArr) {

            // find the price for each day
            const currentPrice = eval(stockData[date]["markPrice"]);
            console.log('currentDay = ' + date + ' currentPrice = ' + currentPrice + ' highPrice = ' + highPrice + ' buyPrice = ' + buyPrice);

            // if that price is greater than the previous day, make new high
            if (currentPrice > highPrice) {
                highPrice = currentPrice;
                buyPrice = (highPrice * percentOf).toFixed(2);
            }

            // if the current price is 5% less than high price - push date
            if (currentPrice <= buyPrice) {


                // once it finds the first dip date, stop searching
                console.log("buy date Utils = " + date);
                return [date, buyPrice];
            }

        }
        return endDate;
    },

      // function takes in date range determines current high price
      findRunawayBuyDate(stockData, dateArr, priceIncrease) {
        console.log("activeUtils percent = " + parseInt(priceIncrease));
        console.log('findRunawayBuyDate running');
        var highPrice = 0;
        var buyPrice;
        const dateArr = dateArr;

        var percentOf = this.calcPercentChange(priceIncrease);
        //    console.log('percentOf dateUtils = ' + percentOf);

        // iterate through dates
        for (const date of dateArr) {

            // find the price for each day
            const currentPrice = eval(stockData[date]["markPrice"]);
            console.log('currentDay = ' + date + ' currentPrice = ' + currentPrice + ' highPrice = ' + highPrice + ' buyPrice = ' + buyPrice);

            // if that price is greater than the previous day, make new high
            if (currentPrice > highPrice) {
                highPrice = currentPrice;
                buyPrice = (highPrice * percentOf).toFixed(2);
            }

            // if the current price is 5% less than high price - push date
            if (currentPrice <= buyPrice) {


                // once it finds the first dip date, stop searching
                console.log("buy date Utils = " + date);
                return [date, buyPrice];
            }

        }
        return endDate;
    },


}

module.exports = ActiveUtils;