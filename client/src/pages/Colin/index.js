
import React, { useState, useEffect } from 'react';
// import Axios from "axios"
import ChartHandler from "../../components/ChartHandler"
import API from "../../utils/API"


export default function Colin() {

    const [data, setData] = useState([]);

    useEffect(() => {
      // params startDate, endDate, symbol, blPerc, bhPerc, slPerc, shPerc
      // returns an object with buyDates and sellDates
      API.runActiveTrading("2018-09-11", "2020-02-14", "GE", 12, 20, 30, 30)
      // check this. 
        .then(res => {
           API.runMultipleSimulations([
             ["GE", "2018-09-11", "2020-02-14", 30000, "activeTrading", [res]],
             ["GE", "2018-09-11", "2020-02-14", 40000, "buyAndWait", []],
    
             ])
             .then(res => {
              console.log(res)
                setData([...data, ...res])
             })
        })

    }, [])

  return (
    <div>
       {data.length > 0 ? <ChartHandler func={"decrease5Percent"} simulations={data} labels={["Buy And Wait", "Buy Low"]} borderColor={["#8A2BE2", "Red"]} fill={[false, false]} pointRadius={[0,0]} /> : "Waiting for data"}
    </div>
  )

}