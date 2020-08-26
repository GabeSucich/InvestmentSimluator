import React, { useEffect, useState } from 'react'
import ChartHandler from "../../components/ChartHandler"
import Helper from "../GatherInformation/utils/Helper"
import API from "../../utils/API"
import Loader from "../../components/Loader"
import { CLEAR_DATA, SET_SIMULATION_DATA, LOAD_SIMULATION } from "../GatherInformation/utils/action"
import { Button, Segment } from "semantic-ui-react"
import { useSimpleInvestmentContext } from "../GatherInformation/utils/GlobalState"

export default function SimulationDisplay(props) {



    const [state, dispatch] = useSimpleInvestmentContext()
    const [loaded, setLoaded] = useState(false)

    if (state.informationGathered && !loaded) {

        setLoaded(true)
        dispatch({type: LOAD_SIMULATION})

    }

    useEffect(() => {

        setLoaded(false)
    }, [])

    useEffect(() => {

        if (state.informationGathered) {

            const startDate = Helper.findFirstDateInYear(state.history, state.startYear)
            const endDate = Helper.findLastDateInYear(state.history)


            API.runMultipleSimulations([
                [state.symbol, startDate, endDate, state.investment, "buyAndWait", []]
            ]).then(data => {

                dispatch({ type: SET_SIMULATION_DATA, data: data })
            })
        }


    }, [state.loadingSimulation])

    const reset = () => {
        dispatch({ type: CLEAR_DATA })
        setLoaded(false)
    }

    console.log(state)

    if (!state.informationGathered) {
        return null
    }

    else if (!state.simulationData) {

        return (
            <Segment textAlign="center">
                <Loader type="cylon" color="red" />
            </Segment>
        )
    }

    else {
        return (
            <Segment textAlign="center">
                <ChartHandler simulations={state.simulationData} labels={[state.symbol]} />
                <Button className="btn-margin" primary onClick={reset}>Invest Again</Button>
            </Segment>

        )

    }


}