import React, { useState, useEffect } from 'react'
import { StandardForm } from "../../../../../SemanticUI/Forms"
import { useInformationContext } from "../../../utils/InformationState"
import Helper from "../../../utils/Helper"
import API from "../../../../../utils/API"
import { SET_INVESTMENT, SET_SIMULATION_DATA } from "../../../utils/action"
import { Form, Button, Segment } from 'semantic-ui-react'
import "./style.css"

export default function InvestmentForm(props) {

    const [state, dispatch] = useInformationContext()
    const [investment, setInvestment] = useState()

    const handleOnChange = (event, { value }) => {
        setInvestment(value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        dispatch({ type: SET_INVESTMENT, investment: investment })
    }

    if (state.activeForm < 3 || state.informationGathered) {
        return null
    }

    else {

        return (
            <Segment textAlign="center">


                <StandardForm>
                    <Form.Input
                        placeholder="Initial Investment"
                        label={`Enter an initial investment amount. To invest in ${state.symbol.toUpperCase()} in ${state.startYear}, you must invest at least $${state.smallestInvestment}`}
                        onChange={handleOnChange}
                    />
                    {investment >= state.smallestInvestment ? <Button className="btn-margin" color="olive" onClick={handleSubmit}>Invest!</Button> : null}
                </StandardForm>
            </Segment>

        )

    }

}