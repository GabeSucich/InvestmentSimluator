import React, { useState, useEffect } from 'react'
import { StandardForm } from "../../../../../SemanticUI/Forms/index"
import { useSimpleInvestmentContext } from "../../../../GatherInformation/utils/GlobalState"
// import Helper from "../../../utils/Helper"
// import API from "../../../../../utils/API"
import { SET_INVESTMENT, SET_SIMULATION_DATA } from "../../../../GatherInformation/utils/action"
import { Form, Button, Segment } from 'semantic-ui-react'
// import "./style.css"

export default function RangeFormBL(props) {

    const [state, dispatch] = useSimpleInvestmentContext()
    const [investment, setInvestment] = useState()

    const handleOnChange = (event, { value }) => {
        setInvestment(value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()


        dispatch({ type: SET_INVESTMENT, investment: investment })

        
    }

    // if (state.activeForm < 3 || state.informationGathered) {
    //     return null
    // }

    // else {

        return (
            <Segment textAlign="center">


                <StandardForm>
                    <Form.Input
                        placeholder="Buy Low Percentage (ex: 4)"
                        label={`What percentage below a current high price would you like to buy?`}
                        onChange={handleOnChange}
                       
                    />
                    {investment >= state.smallestInvestment ? <Button className="btn-margin" color="olive" onClick={handleSubmit}>Invest!</Button> : null}
                    
                </StandardForm>
            </Segment>

        )

    }

// }