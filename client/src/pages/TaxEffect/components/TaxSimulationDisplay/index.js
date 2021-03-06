import React, { useState } from 'react';
import "./style.css"
import API from "../../../../utils/API"
import DataHandler from "../../../../components/DataHandler"
import ChartOptions from "../../../../utils/ChartOptions"
import { useTaxEffectContext } from "../../utils/taxEffectState"
import { Button } from "semantic-ui-react"
import {AlignedContainer} from "../../../../SemanticUI/Containers"
import { SET_DATA, CLEAR_DATA, LOADING } from "../../utils/action"
import Loader from "../../../../components/Loader"
import { Grid } from "semantic-ui-react"
import TaxBar from "../TaxBar"

import randomColors from "../../../../utils/colorRandomize"
const randomizedColors = randomColors()



export default function TaxSimulationDisplay() {

    const BarOptions = ChartOptions.StandardBarOption

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
        <AlignedContainer className="padded-container">
            <Grid.Row textAlign="center" className="margin-above">
                {!state.data ? <Button onClick={() => runSimulation()} primary>{state.currentRegions.length > 0 ? "Run Simulation" : "Select at least one state"}</Button> : null}
                {!state.data ? null : <Button color="red" onClick={() => clearSimulation()}>Clear Simulation</Button>}

            </Grid.Row>
            <Grid.Row textAlign="center">
                {state.loading ? <Loader /> : null}
            </Grid.Row>
            <Grid.Row textAlign="center" className="margin-above">
                {state.data ? <TaxBar backgroundColor={labels.map((_, index) => randomizedColors[index])} simulations={state.data} taxRates={taxRates} labels={labels} options={BarOptions} /> : null}
                <Grid.Column width={12} id="line-chart">
                    {state.data ? <DataHandler func={"decreasePercent"} params={[taxRates]} borderColor={labels.map((_, index) => randomizedColors[index])} simulations={state.data} labels={labels} /> : null}
                </Grid.Column>
            </Grid.Row>
        </AlignedContainer>
    )

}
