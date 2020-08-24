import Axios from "axios"

const API = {

    validateStockSymbol(symbol) {

        return this.getStockData(symbol).then(response => {
            if (response.data) {
                return true
            }
            else {
                return false
            }

        })
    },

    getStockData(symbol) {
        return Axios({
            method: "GET",
            url: "/api/stockdata/" + symbol
        })
    },

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

    findBuyDate(startDate, endDate, symbol) {
        return Axios({
            method: "POST",
            url: "/api/simulation/getBuyDate",
            data: {
                symbol: symbol,
                startDate: startDate,
                endDate: endDate,

            }
        }).then(res => {
            return res.data
        })
    },

    findVolumeDates(symbol, startDate, endDate, percent) {
        return Axios({
            method: "POST",
            url: "/api/simulation/getVolumeDates",
            data: {
                symbol: symbol,
                startDate: startDate,
                endDate: endDate,
                percent: percent
            }
        }).then(res => {
            return res.data
        })
    }

}

export default API