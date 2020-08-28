// import React, { useState, useEffect } from 'react';
// import ChartHandler from "../../components/ChartHandler"
// import API from "../../utils/API"
// import Colors from "../../utils/Colors.json"
// import ChartOptions from "../../utils/ChartOptions"
// import { Grid } from "semantic-ui-react"
// import { Button } from "semantic-ui-react"
// import { SET_ANNUAL_INCOME, SET_MONTHLY_INVESTMENT, ADD_MONTHLY_EXPENSE, CLEAR, LOADING } from "./utils/actions"
// import { useMonthlyInvestmentContext } from "./utils/monthlyInvestmentState"
// import Loader from "../../components/Loader"
import React from "react"
import { MonthlyInvestmentProvider } from "./utils/monthlyInvestmentState"
import MonthlyInvestmentPage from "./page"

function MonthlyInvestment() {

    return (
        <MonthlyInvestmentProvider>
            <MonthlyInvestmentPage/>
        </MonthlyInvestmentProvider>
    )
}

export default MonthlyInvestment



// export default function Sam() {

//   const [labels, setLabels] = useState([])


//   const [state, dispatch] = useMonthlyInvestmentContext();

//   // function run(symbol, startDate, endDate, investment, strategyFuncName, strategyParams, interval) {
//   //   API.getActionDates(interval, startDate, endDate, symbol)
//   //     .then(response => {
//   //       var actionDates = response.data;
//   //       strategyParams[1] = actionDates;
//   //       API.runSimulation(symbol, startDate, endDate, investment, strategyFuncName, strategyParams)
//   //         .then(res => {
//   //           return res
//   //         })
//   //     })
//   // }

//   // useEffect(() => {
//   //   run("CVX", "2010-08-10", "2020-08-10", 1000, "monthlyInvestment", [100, actionDates], 100)
//   //     .then((res1) => {
//   //       console.log(res1)
//   //       run("XOM", "2010-08-10", "2020-08-10", 1000, "monthlyInvestment", [100, actionDates], 100)
//   //       .then((res2) => setData([...data, res1, res2]))
//   //     })
//   // }, [])

//   const lineOptions = ChartOptions.SamMonthlyOptions;

//   const monthly1 = 1000;
//   const monthly2 = 600;

//   useEffect(() => {
//     API.getActionDates(100, "2005-08-25", "2020-02-14", "SPY")
//       .then(actionDates => {
//         API.runMultipleSimulations([
//           ["SPY", "2005-08-25", "2020-02-14", 0, "monthlyInvestment", [monthly1, actionDates]],
//           ["SPY", "2005-08-25", "2020-02-14", 0, "monthlyInvestment", [monthly2, actionDates]]
//         ])
//           .then(res => {
//             setData([...data, ...res])
//           })
//       })
//   }, [])



//   return (
//     <div>
//       {data.length > 0 ? <ChartHandler simulations={data} labels={labels} borderColor={Colors} fill={labels.map(label => false)} pointRadius={labels.map(label => 0)} options={lineOptions}/> : "Waiting for data"}
//     </div>
//   )

// }