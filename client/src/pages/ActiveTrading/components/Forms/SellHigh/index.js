import React, { useState, useEffect } from 'react'
import { StandardForm } from "../../../../../SemanticUI/Forms/index"
import { useActiveTradingContext } from '../../../utils/ActiveState'
// import Helper from "../../../utils/Helper"
// import API from "../../../../../utils/API"
import { SET_BUYLOW, SET_BUYHIGH, SET_SELLLOW, SET_SELLHIGH, SYMBOLLOADING, CLEAR_DATA, INVALID } from "../../../utils/activeAction"
import { Form, Button, Segment } from 'semantic-ui-react'
// import "./style.css"

export default function RangeFormSH(props) {

    const [state, dispatch] = useActiveTradingContext()
    const [invalid, setInvalid] = useState(false)
    const [sellHigh, setSellhigh] = useState()

    const handleOnChange = (event, { value }) => {
        setSellhigh(value)
        dispatch({ type: SET_SELLHIGH, sellHigh: sellHigh});
    }

    const handleSubmit = event => {

        event.preventDefault();
        dispatch({ type: SET_SELLHIGH, sellHigh: sellHigh});
        console.log("state sellHigh = " + state.sellHigh);
       }

    if (state.activeForm < 3 || state.informationGathered) {
        return null
    }

    else {

        return (
            <Segment textAlign="center">


                <StandardForm>
                    <Form.Input
                        placeholder="Sell High Percentage (ex: 50)"
                        label={`What percentage above the purchase price would you like to sell?`}
                        onChange={handleOnChange}
                       
                    />
                    {/* {sellHigh ? <Button className="btn-margin" color="olive" onClick={handleSubmit}>Invest!</Button> : null} */}
                    
                </StandardForm>
            </Segment>

        )

    }
}
