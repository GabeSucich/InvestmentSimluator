module.exports = function volumeSearch(stockHistory, percent) {
    var prevDate = null;
    var currentDate = null;
    var buyDates = [];


    function volumeCompare() {
        var prevVolume = stockHistory[prevDate].volume /*stockHistory big object, value of volume on StockHistory */
        var currentVolume = stockHistory[currentDate].volume

        if (((currentVolume - prevVolume) / prevVolume ) > (percent/100) ) {
            return true
        }
        return false; /*function to compare volume to previous day*/

    }

    for (const [date, data] of Object.entries(stockHistory)) {
        currentDate = date
        if (prevDate) {
            if (volumeCompare()) {
                buyDates.push(currentDate)
            }
        }

        prevDate = date

        // console.log(data.volume);
        // var currentVolume = data.volume;
    }

return buyDates;

}