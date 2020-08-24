import React, { useState } from "react"
import dataModifiers from "../../utils/dataModifier"
import ChartHandler from "../ChartHandler"

export default function DataHandler(props) {

    const [loaded, setLoaded] = useState(false)
    const [newSimulations, setNewSimulations] = useState()

    if (!loaded) {
        setLoaded(true)
        setNewSimulations(dataModifiers[props.func](props.simulations, ...props.params))
    }

    return (
        <div>
            {<ChartHandler {...props} simulations={newSimulations} />}
        </div>
    )
}