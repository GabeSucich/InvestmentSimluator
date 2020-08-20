import React, { useState, useEffect } from 'react';
import Axios from "axios"
import ChartHandler from "../../components/ChartHandler"
import API from "../../utils/API"


export default function Sam() {

    const [data, setData] = useState([]);

    useEffect(() => {

        API.runMultipleSimulations([
            ["SPY", "2000-08-25", "2020-02-14", 60000, "buyAndWait", []]
        ])
            .then(res => {
                console.log(res)
                setData([...data, ...res])
            })
    }, [])


    return (
        <div>
            {data.length > 0 ? <ChartHandler simulations={data} labels={["Buy And Wait"]} pointBackgroundColor={["#8A2BE2"]} /> : "Waiting for data"}
        </div>
    )

}