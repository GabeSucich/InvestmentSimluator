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
    useEffect(() => API.runMultipleSimulations([
        ["AMZN", "2014-08-07", "2015-010-10",2000, "buyAndWait", []],
       
        // ["AAPL", "2000-08-25", "2020-02-14", 100, "monthlyInvestment", [100, actionDates]]
    ])
        .then(res => {
            console.log(res)
            setData([...data, ...res])
        }), [])
    

    



    


    return (
        <div>
            {data.length > 0 ? <ChartHandler simulations={data} labels={["AMZN"]} borderColor={["#8A2BE2", "Red", "Green", "Blue"]} fill={[false, false, false, false]} pointRadius={[0,0, 0, 0]} options={options} /> : "Waiting for data"}
        </div>
    )

}