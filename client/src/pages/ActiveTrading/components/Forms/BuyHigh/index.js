import React, { useState, useEffect } from 'react'
import { StandardForm } from "../../../../../SemanticUI/Forms/index"
import { useActiveTradingContext } from '../../../utils/ActiveState'
// import Helper from "../../../utils/Helper"
// import API from "../../../../../utils/API"
import { SET_BUYLOW, SET_BUYHIGH, SET_SELLLOW, SET_SELLHIGH, SYMBOLLOADING, CLEAR_DATA, INVALID } from "../../../utils/activeAction"
import { Form, Button, Segment } from 'semantic-ui-react'
// import "./style.css"

export default function RangeFormBH(props) {

    const [state, dispatch] = useActiveTradingContext()
    const [invalid, setInvalid] = useState(false)
    const [buyHigh, setBuyhigh] = useState()

   // Value gets passed. 
   const handleOnChange = (event, { value }) => {
        setBuyhigh(value);
        // console.log(value);
     
   }

   const handleSubmit = event => {

    event.preventDefault();
    dispatch({ type: SET_BUYHIGH, buyHigh: buyHigh});
    console.log("state buyHigh = " + state.buyHigh);
   }


    if (state.activeForm < 3 || state.informationGathered) {
        return null
    }

    else {

        return (
            <Segment textAlign="center">


                <StandardForm>
                    <Form.Input
                        placeholder="Buy High Percentage (ex: 4)"
                        label={`What percentage above the sell price would you like to buy?`}
                        onChange={handleOnChange}
                       
                    />
                    {buyHigh ? <Button className="btn-margin" color="olive" onClick={handleSubmit}>Buy High!</Button> : null}
                    
                </StandardForm>
            </Segment>

        )

    }

}