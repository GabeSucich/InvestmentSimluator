import React, { useState, useEffect } from 'react'
import { StandardForm } from "../../../../../SemanticUI/Forms/index"
import { useActiveTradingContext } from '../../../utils/ActiveState'
// import Helper from "../../../utils/Helper"
// import API from "../../../../../utils/API"
import { SET_BUY_LOW, SET_BUY_HIGH, SET_SELL_LOW, SET_SELL_HIGH, SYMBOL_LOADING, CLEAR_DATA, INVALID } from "../../../utils/activeAction"
import { Form, Button, Segment } from 'semantic-ui-react'
// import "./style.css"

export default function RangeFormBH(props) {

    const [state, dispatch] = useActiveTradingContext()
    const [invalid, setInvalid] = useState(false)
    const [investment, setInvestment] = useState()

   const handleOnChange = (event, { value }) => {

   }

   const handleSubmit = () => {

   }


    // if (state.activeForm < 3 || state.informationGathered) {
    //     return null
    // }

    // else {

        return (
            <Segment textAlign="center">


                <StandardForm>
                    <Form.Input
                        placeholder="Buy High Percentage (ex: 4)"
                        label={`What percentage above the sell price would you like to buy?`}
                        onChange={handleOnChange}
                       
                    />
                    {investment >= state.smallestInvestment ? <Button className="btn-margin" color="olive" onClick={handleSubmit}>Invest!</Button> : null}
                    
                </StandardForm>
            </Segment>

        )

    }

// }