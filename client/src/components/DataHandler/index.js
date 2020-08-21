import React from "react"
import dataModifiers from "../../utils/dataModifier"
import ChartHandler from "../../components/ChartHandler"

export default function DataHandler(props) {

    const newSimulations = dataModifiers[props.func](props.simulations, ...props.params)
    
    return (
        <div>
            {<ChartHandler {...props} simulations={newSimulations} />}
        </div>
    )
}