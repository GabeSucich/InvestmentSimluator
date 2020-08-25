const ChartOptions = {

    TaxEffectOptions : {
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

    TaxEffectBarOptions : {
        legend : {
            display: false
        }
    }


}

export default ChartOptions