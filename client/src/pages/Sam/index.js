import React, {useState, useEffect} from 'react';
import Axios from "axios"
import ChartHandler from "../../components/ChartHandler"

export default function Sam() {

    const [data, setData] = useState([]);

    useEffect(() => {
      Axios({
      method: "POST",
      url: "/api/simulation/getIntervalDates",
      data: {
        symbol: "AAPL",
        startDate: "2010-08-10",
        endDate: "2020-08-10",
        interval: 300
      }
    })
      .then(response => {
        const actionDates = response.data
        Axios({
          method: "POST",
          url: "/api/simulation/new",
          data: {
            symbol: "AAPL",
            startDate: "2010-08-10",
            endDate: "2020-08-10",
            investment: 1000,
            strategyFuncName: "monthlyInvestment",
            strategyParams: [100, actionDates]
          }
        }).then(result => {
          setData([...data, result.data])
        })
      })
    }, [])
  
    
  
    return (
      <div>
        {data.length > 0 ? <ChartHandler simulations={data} labels={["test"]} />: "Waiting for data"}
      </div>
    )

}