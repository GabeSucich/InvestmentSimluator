var regression = require('regression')

const VolumeUtils = {


    addDateToRecords(records, date, data, maxRecordsLength) {
        if (records.length < maxRecordsLength) {
            records.push([date, data])
            return records
        }
        else {
            return records.slice(1).concat([[date, data]])
        }
    },

    sumDataProperty(records, dataAttribute) {

        var sum = 0

        for (const [_, data] of records) {
            sum += eval(data[dataAttribute])
        }

        return sum
    },

    averageDataProperty(records, dataAttribute) {

        var sum = this.sumDataProperty(records, dataAttribute)
        var count = records.length

        return sum/count
    },

    linearRegression(records, dataAttribute) {

        const data = []

        for (var i in records) {
            data.push([eval(i), eval(records[i][1][dataAttribute])])
        }

        const linearRegression = regression.linear(data)
    
        return linearRegression.equation[0]

    },

    buyVolumeGradient(records) {

        return this.linearRegression(records, "buyVolume")

    },

    buyFractionAverage(records) {
        return this.averageDataProperty(records, "buyRatioChange")
    },

    findGradientAsPercent(gradient, record) {

        return (gradient/record[0][1].buyVolume)*100
    }


}

module.exports = VolumeUtils
