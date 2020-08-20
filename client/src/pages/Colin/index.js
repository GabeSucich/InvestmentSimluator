import React, {useState, useEffect} from 'react';
import Axios from "axios"
import ChartHandler from "../../components/ChartHandler"

export default function Colin() {

    const [data, setData] = useState([]);

    // 1) returns the dates that we intend to create purchases
    useEffect(() => {
      Axios({
      method: "POST",
      url: "/api/simulation/getIntervalDates",
      data: {
        symbol: "SPY",
        startDate: "2019-08-10",
        endDate: "2020-08-10",
        interval: 4
      }
    })
    // Create a new simulation with 
      .then(response => {
        const actionDates = response.data
        Axios({
          method: "POST",
          url: "/api/simulation/new",
          data: {
            symbol: "SPY",
            startDate: "2019-08-10",
            endDate: "2020-08-10",
            investment: 0,
            strategyFuncName: "frequencyPurchase",
            // var - total amount to be invested, dates of purchase
            strategyParams: [100000, actionDates]
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