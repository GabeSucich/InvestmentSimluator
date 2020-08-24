import React, { useState } from 'react'
import { useSimpleInvestmentContext } from "../../../utils/SimpleInvestmentState"
import { Dropdown, Button } from "semantic-ui-react"
import Helper from "../../../utils/Helper"
import { FluidContainer } from "../../../../../SemanticUI/Containers"
import { SET_START_DATE } from "../../../utils/action"

export default function StartDateForm(props) {

    const [state, dispatch] = useSimpleInvestmentContext()
    const [startYear, setStartYear] = useState("")

    const handleChange = (event, target) => {
        setStartYear(target.value)
    }

    const handleSelection = () => {
        dispatch({ type: SET_START_DATE, startDate: startYear })
    }

    const getOptionsForSymbol = () => {
        return Helper.findAvailableYears(state.history).map(year => {
            console.log(year)
            return { key: year, text: year, value: year }
        })
    }
    

    if (state.activeForm < 1) {
        return null
    }

    else if (!state.startDate) {
        return (
                <Dropdown
                    onChange = {(event, target) => handleChange(event, target) }
                    text={startYear || "Select start year"}
                    options={getOptionsForSymbol()}
                    value={startYear || "Select"}
                />
                // <Button onClick={handleSelection}>Set as Start</Button>
        
        )
    }

    else {
        return (
            <Dropdown
                text={String(startYear)}
                options={[]}
                disabled
            />
        )
    }


}