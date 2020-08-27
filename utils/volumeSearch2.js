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
        data.buyRatioChange = getBuyRatioChange(currentDate) // Gets difference in fraction buys between current date and previous date
        const {buyVolume, sellVolume} = volumeSplitter(stockHistory[currentDate]) // Gets our buy and sell volumes
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

    var counter = 0
    var counterRunning = false

    for (const [date, data] of Object.entries(stockHistory)) {
        
        currentDate = date

        if (prevDate) {
           updateRecords() // Adding the current day to records, which is keeping track of our relevant data
        }

        if (counterRunning) {
            counter +=1
        }

        if (counter === 1) {
            sellDates.push(currentDate)
            counter = 0
            counterRunning = false
        }
        
        else if (records.length === recordLength) { //Makes sure we have a full set of records before looking for buy dates
            
            const buyFractionAverage = VolumeUtils.buyFractionAverage(records) // Finds average of buy-fraction CHANGE over past days

            const buyVolumeGradient = VolumeUtils.buyVolumeGradient(records) // Finds slope of buy volume over past days
            const buyVolumeGradientPercent = VolumeUtils.findGradientAsPercent(buyVolumeGradient, records) // Scales down buy volume gradient to normalize

            if (buyVolumeGradientPercent  > criticalVolumeGradientPercent && buyFractionAverage < criticalAverageSelloff) {

                buyDates.push(currentDate)
                counterRunning = true
            }
        }

        prevDate = date

    }

    return { buyDates: buyDates, sellDates: sellDates };

}
