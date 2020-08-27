import React, { useState, useEffect } from 'react'
import { StandardForm } from "../../../../../SemanticUI/Forms/index"
import { useActiveTradingContext } from '../../../utils/ActiveState'
// import Helper from "../../../utils/Helper"
// import API from "../../../../../utils/API"
import { SET_BUYLOW, SET_BUYHIGH, SET_SELLLOW, SET_SELLHIGH, SYMBOLLOADING, CLEAR_DATA, INVALID } from "../../../utils/activeAction"
import { Form, Button, Segment } from 'semantic-ui-react'
// import "./style.css"

export default function RangeFormBL(props) {

    const [state, dispatch] = useActiveTradingContext()
    const [buyLow, setBuylow] = useState()

    const handleOnChange = (event, { value }) => {
        setBuylow(value); 
    }
    
    const handleOnChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        // console.log('name = '+ name);
        console.log('value = '+ value);
        // this.setState({[name]: value});
        setBuylow(value); 
        dispatch({ type: SET_BUYLOW, buyLow: buyLow});
        window.setTimeout(checkBuyLow(), 3000);
    }

    const checkBuyLow = () => {
        if (buyLow) {
            console.log('conditional met buyLow = ' + buyLow)
            dispatch({ type: SET_BUYLOW, buyLow: buyLow});
        } else {
            console.log('buyLow not there = '+ buyLow );
        }
    }

    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     dispatch({ type: SET_BUYLOW, buyLow: buyLow});
    //     console.log("state buyLow = " + state.buyLow);
    // }

    if (state.activeForm < 3 || state.informationGathered) {
        return null
    }

    else {

        return (
            <Segment textAlign="center">


                <StandardForm>
                    <Form.Input
                        placeholder="Buy Low Percentage (ex: 4)"
                        label={`What percentage below a current high price would you like to buy?`}
                        name = 'setBuylow'
                        onChange={handleOnChange}
                        value = {buyLow}
                       
                    />
                    {/* {buyLow ? <Button className="btn-margin" color="olive" onClick={handleSubmit}>Buy Low!</Button> : null} */}
                    
                </StandardForm>
            </Segment>

        )

    }

}