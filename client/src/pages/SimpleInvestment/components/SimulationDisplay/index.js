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


    if (!state.simulationStarted) {
        return null
    }

    else if (!state.simulationData) {

        return (
            <Segment textAlign="center">
                <Loader type="cylon" color="red"/>
            </Segment>
        )
    }

    else {
        return (
        <Segment textAlign="center">
            <ChartHandler simulations={state.simulationData} labels={[state.symbol]}/>
            <Button className="btn-margin" primary onClick={reset}>Invest Again</Button>
        </Segment>
        
        )

    }


}