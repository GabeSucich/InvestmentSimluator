import React, { useState, useEffect } from 'react'
import { StandardForm } from "../../../../../SemanticUI/Forms"
import { useSimpleInvestmentContext } from "../../../utils/SimpleInvestmentState"
import Helper from "../../../utils/Helper"
import API from "../../../../../utils/API"
import { SET_INVESTMENT, SET_SIMULATION_DATA } from "../.../../../../utils/action"
import { Form, Button } from 'semantic-ui-react'

export default function InvestmentForm(props) {

    const [state, dispatch] = useSimpleInvestmentContext()
    const [investment, setInvestment] = useState()

    const handleOnChange = (event, { value }) => {
        setInvestment(value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        console.log(investment)

        dispatch({ type: SET_INVESTMENT, investment: investment })

        const startDate = Helper.findFirstDateInYear(state.history, state.startYear)
        const endDate = Helper.findLastDateInYear(state.history)
        console.log(startDate)
        console.log(endDate)

        API.runMultipleSimulations([
            [state.symbol, startDate, endDate, investment, "buyAndWait", []]
        ]).then(data => {
            console.log(data)
            dispatch({type: SET_SIMULATION_DATA, data: data})
        })
    }

    if (state.activeForm < 3 || state.simulationStarted) {
        return null
    }

    else {

        return (

            <StandardForm>
                <div className="fixed-dollar">$</div>
                <Form.Input className="form-offset"
                    placeholder="Initial Investment"
                    label={`Enter an initial investment amount. To invest in ${state.symbol.toUpperCase()} in ${state.startYear}, you must invest at least $${state.smallestInvestment}`}
                    onChange={handleOnChange}
                />
                {investment >= state.smallestInvestment ? <Button color="olive" onClick={handleSubmit}>Invest!</Button> : null}
            </StandardForm>

        )

    }

}