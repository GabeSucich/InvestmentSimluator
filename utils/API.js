const axios = require("axios")

// This is how we will interact with the alpha vantage API. getStockData returns a promise which can be ".then"ed by our simulation to get necessary data
const API = {
    getStockData(symbol) {
        const queryUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&outputsize=full&apikey=R0ZPYN5RGGL8MZUO`
        return axios({method: "GET", url: queryUrl})
    }
}
module.exports = API
