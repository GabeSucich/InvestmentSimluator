import React from 'react'
import ChartHandler from "../../../../components/ChartHandler"
import Loader from "../../../../components/Loader"
import {CLEAR_DATA} from "../../utils/action"
import {Button, Segment} from "semantic-ui-react"
import {useSimpleInvestmentContext} from "../../utils/SimpleInvestmentState"

export default function SimulationDisplay(props) {

    const [state, dispatch] = useSimpleInvestmentContext()

    const reset = () => {
        dispatch({type: CLEAR_DATA})
    }

    console.log(state.simulationData)


    if (!state.simulationStarted) {
        return null
    }

    else if (!state.simulationData) {

        return (<Loader type="cylon" color="red"/>)
    }

    else {
        return (
        <Segment textAlign="center">
            <ChartHandler simulations={state.simulationData} labels={[state.symbol]}/>
            <Button primary onClick={reset}>Invest Again</Button>
        </Segment>
        
        )

    }


}