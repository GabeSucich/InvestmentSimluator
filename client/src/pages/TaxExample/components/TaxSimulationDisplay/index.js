import React, { useState } from 'react';
import API from "../../../../utils/API"
import DataHandler from "../../../../components/DataHandler"
import ChartOptions from "../../../../utils/ChartOptions"
import { useTaxEffectContext } from "../../utils/taxEffectState"
import colors from "../../../../utils/Colors.json"
import { SELECT_REGION, SET_DATA, CLEAR_DATA, LOADING } from "../../utils/action"
import Loader from "../../../../components/Loader"


export default function TaxSimulationDisplay() {

    const options = ChartOptions.TaxEffectOptions

    const [labels, setLabels] = useState([])
    const [taxRates, setTaxRates] = useState([])
    console.log(taxRates)

    const [state, dispatch] = useTaxEffectContext();

    const runSimulation = () => {
        dispatch({type: CLEAR_DATA})
        const allSimulations = []
        for (var i in state.currentRegions) {
            allSimulations.push(["FB", "2000-08-25", "2020-02-14", 100, "buyAndWait", []])
        }

        dispatch({ type: LOADING })

        API.runMultipleSimulations(allSimulations).then(data => {
            setLabels(state.currentRegions.map(info => info.region))
            setTaxRates(state.currentRegions.map(info => info.tax))
            dispatch({ type: SET_DATA, data: data })
        })

    }

    return (
        <div>
            <button onClick={() => runSimulation()}>Run Simulation</button>
            {state.loading ? <Loader type={"bubbles"}/> : null}
            {state.data ? <DataHandler func={"decreasePercent"} params={[taxRates]} simulations={state.data} labels={labels} borderColor={colors} fill={labels.map(label => false)} pointRadius={labels.map(label => 0)} options={options} /> : "Waiting for data"}

        </div>
    )

}
