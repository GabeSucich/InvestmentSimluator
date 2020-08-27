import React from 'react'
import { Button, Label } from "semantic-ui-react"
import { useActiveTradingContext } from '../../../utils/ActiveState'


export default function actTradeSubBtn(props) {

    const [state, dispatch] = useActiveTradingContext()

    if(state.buyLow !== undefined && state.buyHigh !== undefined && state.sellLow !== undefined && state.sellHigh !== undefined) {
        return (
            <div>
                <Button className="btn-margin" color="olive" onClick={handleSubmit}>
                   Run Simulation!
                </Button>

            </div>
        )
    }
}