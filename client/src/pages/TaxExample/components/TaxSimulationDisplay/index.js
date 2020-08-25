import React, { useState } from 'react';
import "./style.css"
import API from "../../../../utils/API"
import DataHandler from "../../../../chartComponents/DataHandler"
import ChartOptions from "../../../../utils/ChartOptions"
import { useTaxEffectContext } from "../../utils/taxEffectState"
import colors from "../../../../utils/Colors.json"
import { Button } from "semantic-ui-react"
import { SET_DATA, CLEAR_DATA, LOADING } from "../../utils/action"
import Loader from "../../../../chartComponents/Loader"
import { Grid } from "semantic-ui-react"
import TaxBar from "../TaxBar"



export default function TaxSimulationDisplay() {

    const LineOptions = ChartOptions.TaxEffectOptions
    const BarOptions = ChartOptions.TaxEffectBarOptions

    const [labels, setLabels] = useState([])
    const [taxRates, setTaxRates] = useState([])

    const [state, dispatch] = useTaxEffectContext();

    const runSimulation = () => {

        if (state.currentRegions.length > 0) {
            dispatch({ type: CLEAR_DATA })
            const allSimulations = []
            for (var i in state.currentRegions) {
                allSimulations.push(["AAPL", "2000-08-25", "2020-02-14", 1000, "buyAndWait", []])
            }

            dispatch({ type: LOADING })

            API.runMultipleSimulations(allSimulations).then(data => {
                setLabels(state.currentRegions.map(info => info.region))
                setTaxRates(state.currentRegions.map(info => info.tax))
                dispatch({ type: SET_DATA, data: data })
            })
        }
    }

    const clearSimulation = () => {
        dispatch({ type: CLEAR_DATA })
    }

    return (
        <div>
            <Grid.Row textAlign="center">
                {!state.data ? <Button onClick={() => runSimulation()} primary>{state.currentRegions.length > 0 ? "Run Simulation" : "Select at least one state"}</Button> : null}
                {!state.data ? null : <Button color="red" onClick={() => clearSimulation()}>Clear Simulation</Button>}

            </Grid.Row>
            <Grid.Row textAlign="center">
                {state.loading ? <Loader /> : null}
            </Grid.Row>
            <Grid.Row textAlign="center">
                {state.data ? <TaxBar backgroundColor={labels.map((_, index) => colors[index])} simulations={state.data} taxRates={taxRates} labels={labels} options={BarOptions} /> : null}
                <Grid.Column width={12} id="line-chart">
                    {state.data ? <DataHandler func={"decreasePercent"} params={[taxRates]} simulations={state.data} labels={labels} borderColor={colors} fill={labels.map(label => false)} pointRadius={labels.map(label => 0)} options={LineOptions} /> : null}
                </Grid.Column>
            </Grid.Row>
        </div>
    )

}
