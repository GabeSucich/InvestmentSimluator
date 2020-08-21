import React, { useState, useEffect } from 'react';
import Axios from "axios"
import ChartHandler from "../../components/ChartHandler"
import API from "../../utils/API"


export default function Sam() {

    const [data, setData] = useState([]);

    useEffect(() => {
        API.getActionDates(100, "2000-08-25", "2020-02-14", "ACB")
      .then(actionDates => {
          console.log(actionDates)
        API.runMultipleSimulations([
            ["ACB", "2000-08-25", "2020-02-14", 510, "buyAndWait", []],
            ["ACB", "2000-08-25", "2020-02-14", 10, "monthlyInvestment", [10, actionDates]]
        ])
            .then(res => {
                console.log(res)
                setData([...data, ...res])
            })
    })}, [])


    return (
        <div>
            {data.length > 0 ? <ChartHandler simulations={data} labels={["Buy And Wait", "Dollar Cost Averaging"]} borderColor={["#8A2BE2", "Red"]} fill={[false, false]} pointRadius={[0,0]} /> : "Waiting for data"}
        </div>
    )

}