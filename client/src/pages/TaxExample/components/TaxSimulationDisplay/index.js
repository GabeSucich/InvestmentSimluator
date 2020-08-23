import React, { useState } from 'react';
import API from "../../../../utils/API"
import DataHandler from "../../../../chartComponents/DataHandler"
import ChartOptions from "../../../../utils/ChartOptions"
import { useTaxEffectContext } from "../../utils/taxEffectState"
import colors from "../../../../utils/Colors.json"
import { Button } from "semantic-ui-react"
import { SET_DATA, CLEAR_DATA, LOADING } from "../../utils/action"
import Loader from "../../../../chartComponents/Loader"
import { Grid } from "semantic-ui-react"


export default function TaxSimulationDisplay() {

    const options = ChartOptions.TaxEffectOptions

    const [labels, setLabels] = useState([])
    const [taxRates, setTaxRates] = useState([])
    console.log(taxRates)

    const [state, dispatch] = useTaxEffectContext();

    const runSimulation = () => {
        dispatch({ type: CLEAR_DATA })
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
            <Grid.Row textAlign="center">
                <Button onClick={() => runSimulation()} primary>Run Simulation</Button>
            </Grid.Row>
            <Grid.Row textAlign="center">
                {state.loading ? <Loader type={"bubbles"}/> : null}
                {state.data ? <DataHandler func={"decreasePercent"} params={[taxRates]} simulations={state.data} labels={labels} borderColor={colors} fill={labels.map(label => false)} pointRadius={labels.map(label => 0)} options={options} /> : "Your data will appear here"}
            </Grid.Row>
        </div>
    )

}
