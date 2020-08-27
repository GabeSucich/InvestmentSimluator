import React, { useState, useEffect } from 'react'
import { StandardForm } from "../../../../../SemanticUI/Forms/index"
import { useActiveTradingContext } from '../../../utils/ActiveState'
// import Helper from "../../../utils/Helper"
// import API from "../../../../../utils/API"
import { SET_BUYLOW, SET_BUYHIGH, SET_SELLLOW, SET_SELLHIGH, SYMBOLLOADING, CLEAR_DATA, INVALID } from "../../../utils/activeAction"
import { Form, Button, Segment } from 'semantic-ui-react'
// import "./style.css"

export default function RangeFormSL(props) {

    const [state, dispatch] = useActiveTradingContext()
    const [invalid, setInvalid] = useState(false)
    const [sellLow, setSelllow] = useState()

    const handleOnChange = (event, { value }) => {
        setSelllow(value)
        dispatch({ type: SET_SELLLOW, sellLow: sellLow});
    }

    const handleSubmit = event => {
        dispatch({ type: SET_SELLLOW, sellLow: sellLow});
        event.preventDefault();
        console.log("state sellLow = " + state.sellLow);
       }

    if (state.activeForm < 3 || state.informationGathered) {
        return null
    }

    else {

        return (
            <Segment textAlign="center">


                <StandardForm>
                    <Form.Input
                        placeholder="Sell Low Percentage (ex: 6)"
                        label={`What percentage below the purchase price would you like to sell?`}
                        onChange={handleOnChange}
                       
                    />
                    {/* {sellLow ? <Button className="btn-margin" color="green" onClick={handleSubmit}>Invest!</Button> : null} */}
                    
                </StandardForm>
            </Segment>

        )

    }
}
