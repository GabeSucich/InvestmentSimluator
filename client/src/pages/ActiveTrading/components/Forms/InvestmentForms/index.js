import React, { useState, useEffect } from 'react'
import { StandardForm } from "../../../../../SemanticUI/Forms"
import {  useActiveTradingContext } from "../../../utils/ActiveTradingState"
import Helper from "../../../utils/helper"
import API from "../../../../../utils/API"
import { SET_INVESTMENT, SET_SIMULATION_DATA } from "../.../../../../utils/action"
import { Form, Button } from 'semantic-ui-react'

export default function InvestmentForm(props) {

    const [state, dispatch] = useActiveTradingContext()
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

        API.runActiveTrading("2005-09-11", "2020-02-14", "NIO", 3, 2, 6, 4) 
        .then(res => {
           API.runMultipleSimulations([
             ["NIO", "2005-09-11", "2020-02-14", 20000, "activeTrading", [res]],
             ["NIO", "2005-09-11", "2020-02-14", 20000, "buyAndWait", []],
    
             ])
             .then(res => {
              console.log(res)
              dispatch({type: SET_SIMULATION_DATA, data: data})
             })
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