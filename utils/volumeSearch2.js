const VolumeUtils = require("./VolumeUtils")

module.exports = function volumeSearch(stockHistory, criticalVolumeGradientPercent, criticalAverageSelloff, recordLength) {
    var records = []
    var buyDates = [];
    var sellDates = [];
    var currentDate = null
    var prevDate = null


    function ratioChange(currentVolume, currentTotalVolume, previousVolume, prevTotalVolume) {
        var prevRatio = previousVolume / prevTotalVolume
        var currentRatio = currentVolume / currentTotalVolume
        return (currentRatio - prevRatio) / prevRatio
    }

    function getBuyRatioChange(date) {

        const {buyVolume: prevBuyVolume} = volumeSplitter(stockHistory[prevDate]) 
        const prevTotalVolume = stockHistory[prevDate].volume
        const {buyVolume: currentBuyVolume} = volumeSplitter(stockHistory[currentDate])
        const currentTotalVolume = stockHistory[currentDate].volume

        return ratioChange(eval(currentBuyVolume), eval(currentTotalVolume), eval(prevBuyVolume), eval(prevTotalVolume))

    }

    function updateRecords() {

        const data = {}
        data.buyRatioChange = getBuyRatioChange(currentDate)
        const {buyVolume, sellVolume} = volumeSplitter(stockHistory[currentDate])
        data.buyVolume = buyVolume
        data.sellVolume = sellVolume
        records = VolumeUtils.addDateToRecords(records, currentDate, data, recordLength)

    }

    function volumeSplitter(stockSnapshot) {

        const totalVolume = eval(stockSnapshot.volume)
        var closePrice = eval(stockSnapshot.close)
        var openPrice = eval(stockSnapshot.open)
        var closeToOpenRatio = (closePrice / openPrice)
        var buyVolume = ((totalVolume / (1 + closeToOpenRatio)) * closeToOpenRatio).toFixed()
        var sellVolume = ((totalVolume) / (1 + closeToOpenRatio)).toFixed()
        return { buyVolume: buyVolume, sellVolume: sellVolume }

    }

    for (const [date, data] of Object.entries(stockHistory)) {
        
        currentDate = date
        if (prevDate) {
           updateRecords() 
        }
        
        if (records.length === recordLength) {
            const buyVolumeGradient = VolumeUtils.buyVolumeGradient(records)
            const buyFractionAverage = VolumeUtils.buyFractionAverage(records)

            if (VolumeUtils.findGradientAsPercent(buyVolumeGradient, records)  > criticalVolumeGradientPercent && buyFractionAverage < criticalAverageSelloff) {

                buyDates.push(currentDate)
            }
        }

        prevDate = date

    }

    return { buyDates: buyDates, sellDates: sellDates };

}
