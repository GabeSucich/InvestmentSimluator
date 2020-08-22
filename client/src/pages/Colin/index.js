import React, { useState, useEffect } from 'react';
import Axios from "axios"
import ChartHandler from "../../components/ChartHandler"
import API from "../../utils/API"


export default function Colin() {

    const [data, setData] = useState([]);

    useEffect(() => {
      API.findBuyDate("2010-08-21", "2020-02-14", "TSLA")
      // check this. 
        .then(res => {
          console.log("buyDate = " + res[0]);
          console.log("buyPrice = " + parseInt(res[1]));
           API.runMultipleSimulations([
             ["GE", res[0], "2020-02-14", 60000, "buyLow", [60000, res[0], parseInt(res[1])]],
             ["GE", "2000-08-25", "2020-02-14", 60000, "buyAndWait", []],
    
             ])
             .then(res => {
              console.log(res)
                setData([...data, ...res])
             })
        })

    }, [])

  return (
    <div>
       {data.length > 0 ? <ChartHandler func={"decrease5Percent"} simulations={data} labels={["Buy Low", "Buy And Wait"]} borderColor={["#8A2BE2", "Red"]} fill={[false, false]} pointRadius={[0,0]} /> : "Waiting for data"}
    </div>
  )

}