const mongoose = require("mongoose")

mongoose.connect(process.MONGODB_URI || "mongodb://localhost/stockhistorydb", { useNewUrlParser: true })

const StockHistory = require("../models/StockHistory")

const Historicals = {

    findHistory(symbol) {
        return StockHistory.findOne({ symbol: symbol }).exec()
    },
    
    createHistory(symbol, historicals) {
        return StockHistory.create({ symbol: symbol, historicals: historicals })
    }

}

module.exports = Historicals