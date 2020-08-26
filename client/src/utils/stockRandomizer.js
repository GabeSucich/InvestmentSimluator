import Stocks from "./Stocks.json"

export default function stockRandomizer() {

    var stockCopy = Stocks.slice()
    const containedClasses = []
    const randomStocks = []

    for (var i=0; i<4; i++) {

        var randomIndex = Math.floor(stockCopy.length*Math.random())
        var newElement = stockCopy[randomIndex]
        randomStocks.push(newElement)
        containedClasses.push(newElement.class)
        stockCopy = stockCopy.filter(item => item.class !== newElement.class)

    }

    return randomStocks

}