import React, { useState, useEffect } from 'react';
import Axios from "axios"
import ChartHandler from "../../components/ChartHandler"
import API from "../../utils/API"


export default function Colin() {

    const [data, setData] = useState([]);

    useEffect(() => {
            API.runMultipleSimulations([
            // ["GE", "2019-08-25", "2020-02-14", 60000, "buyLow", []],
            ["GE", "2019-08-25", "2020-02-14", 60000, "buyAndWait", []]
            ])
            .then(res => {
                console.log(res)
                setData([...data, ...res])
            })
       
    }, [])

  return (
    <div>
      {data.length > 0 ? <ChartHandler simulations={data} labels={["Colin", "Buy And Wait"]}/> : "Waiting for data"}
    </div>
  )

}