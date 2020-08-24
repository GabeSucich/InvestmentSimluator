module.exports = function volumeSearch(stockHistory, percent) {
    var prevDate = null;
    var currentDate = null;
    var buyDates = [];
    var sellDates = [];


    function volumeCompare() {
        // var prevVolume = stockHistory[prevDate].volume /*stockHistory big object, value of volume on StockHistory */
        // // var prevBuyOrSellVolume = volumeSplitter(stockHistory[prevDate], prevVolume) /*joel added*/
        var previousVolume = stockHistory[prevDate].volume
        var { buyVolume: prevBuyVolume, sellVolume: prevSellVolume } = volumeSplitter(stockHistory[prevDate], previousVolume) /*joel added*/
        var currentVolume = stockHistory[currentDate].volume
        var { buyVolume: currentBuyVolume, sellVolume: currentSellVolume } = volumeSplitter(stockHistory[currentDate], currentVolume) /*joel added*/

        // console.log("-----buy volume----------");
        // console.log(buyVolume);
        // console.log("------sell volume--------");
        // console.log(sellVolume);
        console.log("buy volume:" + currentBuyVolume);
        // if (buySellVolume.buyVolume )
        console.log("ration Change:" + ratioChange(currentBuyVolume, currentVolume, prevBuyVolume, previousVolume) + " on " + currentDate);
        
        if (ratioChange(currentBuyVolume, currentVolume, prevBuyVolume, previousVolume) > (percent / 100)) {
            return 'buy'
        }
        else if (ratioChange(currentSellVolume, currentVolume, prevSellVolume, previousVolume) > (percent / 100)) {
            return 'sell'

        }
        return null; /*function to compare volume to previous day*/

    }


    function ratioChange(currentVolume, currentTotalVolume, previousVolume, prevTotalVolume) {
        var prevRatio = previousVolume / prevTotalVolume
        var currentRatio = currentVolume / currentTotalVolume
        return (currentRatio - prevRatio) / prevRatio
    }



    function volumeSplitter(stockSnapshot, totalVolume) {
        // console.log("*********");
        // console.log(stockSnapshot);
        // console.log("***");

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
            if (volumeCompare() === "buy") {
                buyDates.push(currentDate)
            }
            else if (volumeCompare() === "sell") {
                sellDates.push(currentDate)
            }
        }

        prevDate = date
    }

    return { buyDates: buyDates, sellDates: sellDates };

}
