var mongoose = require("mongoose")
var Schema = mongoose.Schema

const StockHistorySchema = new Schema({
    symbol: String,
    historicals: Object,
})

const StockHistory = mongoose.model("StockHistory", StockHistorySchema)

module.exports = StockHistory