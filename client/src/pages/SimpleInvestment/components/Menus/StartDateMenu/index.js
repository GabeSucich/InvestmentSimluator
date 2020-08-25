import React, { useState } from 'react'
import { useSimpleInvestmentContext } from "../../../utils/SimpleInvestmentState"
import { Menu } from "semantic-ui-react"
import Helper from "../../../utils/Helper"
import {SET_START_YEAR} from "../../../utils/action"
import "./style.css"


export default function StartDateMenu(props) {

    const [state, dispatch] = useSimpleInvestmentContext()

    const getAvailableYears = () => {
        if (state.history) {
            return Helper.findAvailableYears(state.history)
        }
        return []
    }

    const handleSelection = (year) => {
        dispatch({type: SET_START_YEAR, startYear: year})
    }


    if (state.activeForm < 1 || state.simulationStarted) {
        return null
    }

    else if (!state.startYear) {

        var availableYears = getAvailableYears()
        console.log(availableYears)
        return (
            <div className="contained">
                <Menu vertical>
                    {availableYears.map((year, index) => {
                        return <Menu.Item
                            key={index}
                            name={year}
                            active={state.startYear === year}
                            onClick={() => handleSelection(year)}
                        />
                    })}
                </Menu>
            </div>
        )
    }

    else {
        return (
            <Menu vertical disabled inverted>
                <Menu.Item
                    name={state.startYear}
                    active={true}
                />
            </Menu>
        )
    }





}




