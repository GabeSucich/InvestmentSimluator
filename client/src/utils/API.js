import Axios from "axios"

const API = {
    getActionDates(interval, startDate, endDate, symbol) {
        return Axios({
            method: "POST",
            url: "/api/simulation/getIntervalDates",
            data: {
                symbol: symbol,
                startDate: startDate,
                endDate: endDate,
                interval: interval
            }
        }).then(res => {
            return res.data
        })
    },

    runSimulation(symbol, startDate, endDate, investment, strategyFuncName, strategyParams) {
        return Axios({
            method: "POST",
            url: "/api/simulation/new",
            data: {
                symbol: symbol,
                startDate: startDate,
                endDate: endDate,
                investment: investment,
                strategyFuncName: strategyFuncName,
                strategyParams: strategyParams
            }
        }).then(res => {
            return res.data
        })
    },

    runMultipleSimulations(arr) {
        const simulations = [];
        var counter = 0;
        var finished = false;
        var API = this;
        function gatherData() {
            if (counter === arr.length) {
                return simulations
            } else {
                return API.runSimulation(...arr[counter])
                    .then(res => {
                        simulations.push(res)
                        counter += 1;
                        return gatherData()
                    })
            }
        }
        return gatherData();
    },

    // function takes in date range determines current high price
    findBuyDate(stockData) {
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


                // once it finds the first dip date, stop searching
                console.log("buy date = " + date);
                return date;
            }
        }
    } 


}

export default API