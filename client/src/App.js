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
import 'semantic-ui-css/semantic.min.css'

import Sam from "./pages/Sam"
import Colin from './pages/Colin';

function App() {

  return (
    <div>
    <Sam/>
    <Colin/>
    </div>
  )
>>>>>>> 9ea7d6ab11f0cc561b9aa0996564c9bcb4530810
}

export default App;
