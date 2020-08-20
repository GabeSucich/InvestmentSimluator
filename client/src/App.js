<<<<<<< HEAD
import React, { useState } from 'react';
import Axios from "axios"
import ChartHandler from "./components/ChartHandler"

function App() {

  const [data, setData] = useState([]);

  Axios({
    method: "POST",
    url: "/api/simulation/getIntervalDates",
    data: {
      symbol: "SPY",
      startDate: "2010-08-10",
      endDate: "2020-08-10",
      interval: 300
    }
  })
    .then(actionDates => {
      Axios({
        method: "POST",
        url: "/api/simulation/new",
        data: {
          symbol: "SPY",
          startDate: "2010-08-10",
          endDate: "2020-08-10",
          investment: 1000,
          strategyFuncName: "monthlyInvestment",
          strategyParams: [100, actionDates]
        }
      }).then(result => {
        setData([...data, result])
        console.log(result)
      })
    })

  return (
    <div>
      data.length > 0 ? <ChartHandler simulations={data} labels={["test"]} />
    </div>
  );
=======
import React, {useState, useEffect} from 'react';

import Sam from "./pages/Sam"

function App() {

  return (
    <Sam/>
  )
>>>>>>> 9ea7d6ab11f0cc561b9aa0996564c9bcb4530810
}

export default App;
