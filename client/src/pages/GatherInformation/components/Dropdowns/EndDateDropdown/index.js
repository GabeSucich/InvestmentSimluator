import React, { useState } from 'react'
import { useSimpleInvestmentContext } from "../../../utils/GlobalState"
import { Menu, Dropdown, Button, Segment } from "semantic-ui-react"
import Helper from "../../../utils/Helper"
import { SET_END_YEAR } from "../../../utils/action"
import "./style.css"


export default function StartDateMenu(props) {

    const [state, dispatch] = useSimpleInvestmentContext()
    const [endYear, setEndYear] = useState(null)

    const getAvailableYears = () => {
        if (state.history) {
            return Helper.findAvailableYears(state.history).filter(year => eval(year) > eval(state.startYear)).map(year => {
                return {
                    key: year,
                    text: year,
                    value: year
                }
            })
        }
        return []
    }

    const handleChange = (event, { value }) => {
        setEndYear(value)
    }

    const handleSelection = () => {
        dispatch({ type: SET_END_YEAR, endYear: endYear })
    }


    if (state.activeForm < 2 || state.informationGathered) {
        return null
    }

    else if (!state.endYear) {

        var availableYears = getAvailableYears()

        return (
            <Segment textAlign="center">
                <Dropdown
                    onChange={handleChange}
                    placeholder='End Year'
                    fluid
                    selection
                    options={availableYears}
                />
                {endYear ? <Button className="btn-margin" color="olive" onClick={() => { handleSelection(endYear) }}>Set end year</Button> : null}
            </Segment>
        )
    }

    else {
        return (
            <Segment color="olive" textAlign="center">
                <Menu vertical disabled fluid>
                    <Menu.Item
                        name={state.endYear}
                        active={true}
                    />
                </Menu>
            </Segment>
        )
    }





}