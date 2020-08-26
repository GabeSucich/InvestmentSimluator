import React, { useState } from 'react'
import { useSimpleInvestmentContext } from "../../../utils/GlobalState"
import { Dropdown, Button, Menu, Segment } from "semantic-ui-react"
import Helper from "../../../utils/Helper"
import { SET_START_YEAR } from "../../../utils/action"
import "./style.css"


export default function StartDateDropdown(props) {

    const [state, dispatch] = useSimpleInvestmentContext()
    const [startYear, setStartYear] = useState(null)

    const getAvailableYears = () => {
        if (state.history) {
            return Helper.findAvailableYears(state.history).filter((_, index, wholeArr) => index !== wholeArr.length - 1).map(year => {
                return {
                    key: year,
                    text: year,
                    value: year
                }
            })
        }
        return []
    }

    const handleSelection = () => {
        dispatch({ type: SET_START_YEAR, startYear: startYear })
    }

    const handleChange = (event, { value }) => {
        setStartYear(value)
    }


    if (state.activeForm < 1 || state.informationGathered) {
        return null
    }

    else if (!state.startYear) {

        var availableYears = getAvailableYears()

        return (
            <Segment textAlign="center">
                <Dropdown
                    onChange={handleChange}
                    placeholder='Start Year'
                    fluid
                    selection
                    options={availableYears}
                />
                {startYear ? <Button className="btn-margin" color="olive" onClick={() => { handleSelection(startYear) }}>Set start year</Button> : null}
            </Segment>

        )
    }

    else {
        return (
            <Segment color="olive" textAlign="center">
                <Menu vertical disabled fluid>
                    <Menu.Item
                        name={state.startYear}
                        active={true}
                    />
                </Menu>
            </Segment>
        )
    }





}




