import Axios from "axios"
import bcrypt from "bcryptjs"

const API = {

    loginUser(username, password) {
        return Axios({
            method: "GET",
            url: "/api/user/" + username
        }).then(response => {
            const dbUser = response.data
            if (!dbUser) {
                return "NoUser"
            }
            else {
                if (bcrypt.compareSync(password, dbUser.password)) {
                    return dbUser.username
                }
                else {
                    return "wrongPass"
                }
            }
        })
    },

    createUser(username, password) {
        var encryptedPass = bcrypt.hashSync(password, bcrypt.genSaltSync(10), null)
        return Axios({
            method: "POST",
            url: "/api/user",
            data: {
                username: username,
                password: encryptedPass
            }
        }).then(response => {
            const dbUser = response.data
            if (!dbUser) {
                return null
            }
            else {
                return dbUser.username
            }
        })

    },

    validateStockSymbol(symbol) {

        return this.getStockData(symbol).then(response => {
            if (response.data) {
                return true
            } else {
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

    findBuyDate(startDate, endDate, symbol, percent) {
        return Axios({
            method: "POST",
            url: "/api/simulation/getBuyDate",
            data: {
                symbol: symbol,
                startDate: startDate,
                endDate: endDate,
                percent: percent,


            }
        }).then(res => {
            return res.data
        })
    },

    runActiveTrading(startDate, endDate, symbol, blPerc, bhPerc, slPerc, shPerc) {
        console.log('API runActive called');
        return Axios({
            method: "POST",
            url: "/api/simulation/activeTrading",
            data: {
                startDate: startDate,
                endDate: endDate,
                symbol: symbol,
                blPerc: blPerc,
                bhPerc: bhPerc,
                slPerc: slPerc,
                shPerc: shPerc,
            }
        }).then(res => {
            return res.data
        })
    },

    findVolumeDates(symbol, startDate, endDate, criticalVolumeGradient, criticalAverageSelloff, recordLength) {
        return Axios({
            method: "POST",
            url: "/api/simulation/getVolumeDates",
            data: {
                symbol: symbol,
                startDate: startDate,
                endDate: endDate,
                criticalAverageSelloff: criticalAverageSelloff,
                criticalVolumeGradient: criticalVolumeGradient,
                recordLength: recordLength
            }
        }).then(res => {
            return res.data
        })
    }

}
export default API