import React, { useState, useEffect } from 'react';
import Axios from "axios"
import ChartHandler from "../../components/ChartHandler"
import DataHandler from "../../components/DataHandler"
import API from "../../utils/API"
import { SET_SIMULATION_DATA } from '../SimpleInvestment/utils/action';

export default function VolumeTrigger() {

    const [data, setData] = useState([])

    useEffect(() => {
        API.findVolumeDates("GE", "2010-08-07", "2020-08-30", 200, -.01, 3)
            .then(volumeDates => {
                console.log(volumeDates)
                API.runMultipleSimulations([
                    ["GE", "2010-08-07", "2020-08-30", 1000, "volumeTrigger2", [volumeDates, 11, 60]],
                    ["GE", "2010-08-07", "2020-08-30", 1000, "buyAndWait", []]
                ])
                    .then(res => {
                        console.log(res)
                        setData([...data, ...res])
                    })
            })
    }, [])

    return <div>
        {data.length > 0 ? <ChartHandler simulations={data} labels={["Volume", "Buy andWait"]} borderColor={["#8A2BE2", "Red"]} fill={[false, false]} pointRadius={[0, 0]} /> : "Waiting for data"}
    </div>
}


    // const [data, setData] = useState([]);

//     useEffect(() => {
//       API.runMultipleSimulations([
//               ["AMZN", "2014-08-07", "2015-08-10", 1, "volumeTrigger", []]
//       ])

//     // from API.js (symbol, startDate, endDate, investment, strategyFuncName, strategyParams)
//     // from volumeTrigger (strategy function symbol, portfolio, stockData, currentDate)
//       .then(res => {
//         console.log(res);
//         setData([...data, ...res]) 

//       })
//     }, [])
//     return (
//       <div>
//           {data.length > 0 ? <ChartHandler simulations={data} labels={["10,000", "10,000"]} borderColor={["#8A2BE2", "Red"]} fill={[false, false]} pointRadius={[0,0]} /> : "Waiting for data"}
//       </div>
//   )

//     }


    // logic goes here
//     let percentStateTax1 = stateTaxRate1 / 100
//     let percentStateTax2 = StateTaxRate2 / 100
//     let deltaStateTax = ((suggestionsArr[0] * percentStateTax1) - (suggestionsArr[1] * percentStateTax2))
//     console.log("Delta" + deltaStateTax);
