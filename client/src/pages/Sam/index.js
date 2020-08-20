import React, { useState, useEffect } from 'react';
import Axios from "axios"
import ChartHandler from "../../components/ChartHandler"
import API from "../../utils/API"


export default function Sam() {

  var actionDates;

  const [data, setData] = useState([]);

  // function run(symbol, startDate, endDate, investment, strategyFuncName, strategyParams, interval) {
  //   API.getActionDates(interval, startDate, endDate, symbol)
  //     .then(response => {
  //       var actionDates = response.data;
  //       strategyParams[1] = actionDates;
  //       API.runSimulation(symbol, startDate, endDate, investment, strategyFuncName, strategyParams)
  //         .then(res => {
  //           return res
  //         })
  //     })
  // }

  // useEffect(() => {
  //   run("CVX", "2010-08-10", "2020-08-10", 1000, "monthlyInvestment", [100, actionDates], 100)
  //     .then((res1) => {
  //       console.log(res1)
  //       run("XOM", "2010-08-10", "2020-08-10", 1000, "monthlyInvestment", [100, actionDates], 100)
  //       .then((res2) => setData([...data, res1, res2]))
  //     })
  // }, [])



  useEffect(() => {
    API.getActionDates(100, "2000-08-25", "2003-02-14", "GE")
      .then(actionDates => {
        console.log(actionDates)
        API.runMultipleSimulations([
          ["GE", "2000-08-25", "2003-02-14", 1000, "monthlyInvestment", [1000, actionDates]],
          ["GE", "2000-08-25", "2003-02-14", 8000, "buyAndWait", []]
        ])
          .then(res => {
            console.log(res)
            setData([...data, ...res])
          })
      })
  }, [])



  return (
    <div>
      {data.length > 0 ? <ChartHandler simulations={data} labels={["buyAndWait", "Colin"]}/> : "Waiting for data"}
    </div>
  )

}