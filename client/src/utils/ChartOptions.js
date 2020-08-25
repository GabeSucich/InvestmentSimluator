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
    }


}

export default ChartOptions