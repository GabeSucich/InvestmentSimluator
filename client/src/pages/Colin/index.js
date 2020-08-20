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
        symbol: "PLAY",
        startDate: "2010-08-10",
        endDate: "2020-08-10",
        interval: 30
      }
    })
    // Create a new simulation with 
      .then(response => {
        const actionDates = response.data
        Axios({
          method: "POST",
          url: "/api/simulation/new",
          data: {
            symbol: "PLAY",
            startDate: "2010-08-10",
            endDate: "2020-08-10",
            investment: 0,
            strategyFuncName: "frequencyPurchase",
            // var - invested, dates
            strategyParams: [10000, actionDates]
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