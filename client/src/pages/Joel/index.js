import React, {useState, useEffect} from 'react';
import Axios from "axios"
import ChartHandler from "../../components/ChartHandler"
import DataHandler from "../../components/DataHandler"
import API from "../../utils/API"

export default function Joel () {

    const [data, setData] = useState([]);

    useEffect(() => {
      API.runMultipleSimulations([
        ["AMZN", "2014-08-07", "2020-08-10", 10000, "stateTaxAffect", [0, 13]],
        ["AMZN", "2014-08-07", "2020-08-10", 10000, "stateTaxAffect", [0, 13]]
      ])
      .then(res => {
        console.log(res);
        setData([...data, ...res]) 
        
      })
    }, [])
    return (
      <div>
          {data.length > 0 ? <DataHandler func={"decrease5Percent"} simulations={data} labels={["10,000", "10,000"]} borderColor={["#8A2BE2", "Red"]} fill={[false, false]} pointRadius={[0,0]} /> : "Waiting for data"}
      </div>
  )

    }
    

    // logic goes here
//     let percentStateTax1 = stateTaxRate1 / 100
//     let percentStateTax2 = StateTaxRate2 / 100
//     let deltaStateTax = ((suggestionsArr[0] * percentStateTax1) - (suggestionsArr[1] * percentStateTax2))
//     console.log("Delta" + deltaStateTax);
