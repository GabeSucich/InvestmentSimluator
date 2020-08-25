import React, { useState, useEffect } from 'react';
import Axios from "axios"
import ChartHandler from "../../components/ChartHandler"
import {defaults} from "react-chartjs-2"
import API from "../../utils/API"
import DataHandler from "../../components/DataHandler"


export default function Gabe() {

    defaults.global.animation = {

        easing: "easeOutBounce"
    }

    const options = {
        scales: {
            xAxes: [{
                ticks: {
                    autoSkip: true,
                    maxTicksLimit: 20,
                }
            }]
        },


    }

    const [data, setData] = useState([]);

    useEffect(() => {
        API.getActionDates(100, "2000-08-25", "2020-02-14", "AAPL")
      .then(actionDates => {
          console.log(actionDates)
        API.runMultipleSimulations([
            ["AAPL", "2000-08-25", "2020-02-14", 5100, "buyAndWait", []],
            ["AAPL", "2000-08-25", "2020-02-14", 5100, "buyAndWait", []],
            ["AAPL", "2000-08-25", "2020-02-14", 5100, "buyAndWait", []],
            ["AAPL", "2000-08-25", "2020-02-14", 5100, "buyAndWait", []]
            // ["AAPL", "2000-08-25", "2020-02-14", 100, "monthlyInvestment", [100, actionDates]]
        ])
            .then(res => {
                console.log(res)
                setData([...data, ...res])
            })
    })}, [])

    


    return (
        <div>
            {data.length > 0 ? <DataHandler func={"decreasePercent"} params={[[1, .75, .60, .45]]} simulations={data} labels={["Florida", "Wyoming", "California", "Sweden"]} borderColor={["#8A2BE2", "Red", "Green", "Blue"]} fill={[false, false, false, false]} pointRadius={[0,0, 0, 0]} options={options} /> : "Waiting for data"}
        </div>
    )

}