import React, { useState } from 'react'
import { useSimpleInvestmentContext } from "../../../utils/SimpleInvestmentState"
import { Dropdown, Button } from "semantic-ui-react"
import Helper from "../../../utils/Helper"
import { FluidContainer } from "../../../../../SemanticUI/Containers"
import { SET_START_DATE } from "../../../utils/action"

export default function StartDateForm(props) {

    const [state, dispatch] = useSimpleInvestmentContext()
    const [startYear, setStartYear] = useState("Yeet")

    const handleChange = (event, { value }) => {
        setStartYear(value)
    }

    const handleSelection = () => {
        dispatch({ type: SET_START_DATE, startDate: startYear })
    }

    const getOptionsForSymbol = () => {
        return Helper.findAvailableYears(state.history).map(year => {
            return { key: year, text: year, value: year }
        })
    }

    if (state.activeForm < 1) {
        return null
    }

    else if (!state.startDate) {
        return (
            <FluidContainer>
                <Dropdown
                    placeholder="Investment"
                    onChange={handleChange}
                    options={getOptionsForSymbol()}
                    selection
                    value={startYear}
                     />
                <Button onClick={handleSelection}>Set as Start</Button>
            </FluidContainer>
        )
    }

    else {
        return (
            <Dropdown 
                text={String(startYear)}
                options = {[]}
                disabled
                />
        )
    }


}