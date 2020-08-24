const DateUtils = require("../utils/dateUtils")

const ActiveDateUtils = {

    activeTrading(stockData, startDate, endDate, symbol, blPerc, bhPerc, slPerc, shPerc) {
        ​
        var buying = true
        const buyDates = []
        const sellDates = []
        var currentMax = null;
        var currentMin = null;
        var initalPrice = null;
        var buyPrice;

        // returns an array of all dates in range
        var dateArr = Object.keys(stockData);
        const totalLenth = dateArr.length​;

        // goes through all dates to buy or sell
        while (dateArr.length > 0) {
            if (buying) {
                nextBuyDate(dateArr)

            } else {
                findSellDate(dateArr)
            }
        }​​​

        function nextBuyDate(dateArr) {
            var date1 = findDateBuyLow(stockData, dateArr, blPerc)[0];
            var date2 = findDateBuyHigh(stockData, dateArr, bhPerc)[0];

            var buyPrice1 = findDateBuyLow(stockData, dateArr, slPerc)[1];
            var buyPrice2 = findDateBuyHigh(stockData, dateArr, slPerc)[1];

            var date1NoDash = DateUtils.removeDateDashes(date1)[0];
            var date2NoDash = DateUtils.removeDateDashes(date1)[0];

            if (date1NoDash < date2NoDash) {
                buyDates.push(date1);
                buyPrice = buyPrice1;
                dateArr = fastForwardHistory(dateArr, date1);
                buying = false;
            }​
            else {
                buyDates.push(date2);
                buyPrice = buyPrice2;
                dateArr = fastForwardHistory(dateArr, date2);
                buying = false;
            }​
        }​

        function findSellDate(dateArr) {
            var date1 = findDateSellLow(stockData, dateArr, slPerc, buyPrice);
            var date2 = findDateSellHigh(stockData, dateArr, shPerc, buyPrice);

            var date1NoDash = DateUtils.removeDateDashes(date1);
            var date2NoDash = DateUtils.removeDateDashes(date1);
            
            if (date1NoDash < date2NoDash) {
                buyDates.push(date1)
                dateArr = fastForwardHistory(dateArr, date1)
                buying = false
            }​
            else {
                buyDates.push(date2)
                dateArr = fastForwardHistory(dateArr, date2)
                buying = false
            }​

            ​
        }​
        return {
            sellDates: sellDates,
            buyDates: buyDates
        }​

        ​
    }​,

    fastForwardHistory(stockHistory, date) {
        const indexOfDate = stockHistory.indexOf(date)
        return stockHistory.slice(indexOfDate)
    },



     // takes in an integer (5) and returns the decimal equivalent subtracted from 100% (.95)
     calcPercentChangeDown(percent) {
        var firstStep = 100 - percent;
        var secondStep = firstStep * 0.01;
        return secondStep;
    },

    calcPercentChangeUp(percent) {
        var firstStep = 100 + percent;
        var secondStep = firstStep * 0.01;
        return secondStep;
    },

     // function takes in date range - returns date to buy when stock value has decreased a specified percentage
     findDateBuyLow(stockData, dateArr, percentDecrease) {
        console.log("activeTradingDates percent = " + parseInt(percentDecrease));
        console.log('findBuyDateLow running');
        var highPrice = 0;
        var buyPrice;
        const dateArr = dateArr;

        var percentOf = this.calcPercentChangeDown(percentDecrease);
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

      // function takes in date range - returns date to buy when stock value has increased a specified percentage
      findDateBuyHigh(stockData, dateArr, priceIncrease) {
        console.log("activeTradingDates percent = " + parseInt(priceIncrease));
        console.log('findRunawayBuyDate running');
        var highPrice = 0;
        var buyPrice;
        const dateArr = dateArr;

        var percentOf = this.calcPercentChangeUp(priceIncrease);
        // console.log('percentOf dateUtils = ' + percentOf);

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

         // function takes in date range - returns date to buy when stock value has decreased a specified percentage
         findDateSellLow(stockData, dateArr, percentDecrease, buyPrice) {
            console.log("activeTradingDates percent = " + parseInt(percentDecrease));
            console.log('findBuyDateLow running');
            const dateArr = dateArr;
    
            var percentOf = this.calcPercentChangeDown(percentDecrease);
            //    console.log('percentOf dateUtils = ' + percentOf);

            // 100 * 0.2 = 20;
            var sellSDiffernece = (buyPrice * percentOf).toFixed(2);
            // 100 - 20 = 80 (sell!);
            var sellPrice = buyPrice - sellSDiffernece;
    
            // iterate through dates
            for (const date of dateArr) {
    
                // find the price for each day
                const currentPrice = eval(stockData[date]["markPrice"]);
                console.log('currentDay = ' + date + ' currentPrice = ' + currentPrice  + ' buyPrice = ' + buyPrice);
    
    
                // if the current price is 5% less than high price - push date
                if (currentPrice <= sellPrice) {

                    // once it finds the first dip date, stop searching
                    console.log("sell date Low = " + date);
                    return date;
                }
    
            }
            return endDate;
        },


}​​​

console.log(numState(5));

module.exports = ActiveDateUtils;