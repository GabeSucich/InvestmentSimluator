const ChartOptions = {

    StandardLineOptions : {
        legend: {
            position: "left"
        },
        scales: {
            xAxes: [{
                ticks: {
                    autoSkip: true,
                    maxTicksLimit: 20,
                }
            }]
        }
    },

    StandardBarOption : {
        legend : {
            display: false
        }
    },

    SamMonthlyOptions : {
        scales: {
            xAxes: [{
                ticks: {
                    autoSkip: true,
                    maxTicksLimit: 20
                }
            }],
            yAxes: [{
                ticks: {
                    callback: function(value, index, values) {
                        return "$" + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    }
                }
            }]
        }
    }


}

export default ChartOptions