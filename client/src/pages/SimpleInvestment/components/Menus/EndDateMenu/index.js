import React, { useState } from 'react'
import { useSimpleInvestmentContext } from "../../../utils/SimpleInvestmentState"
import { Menu } from "semantic-ui-react"
import Helper from "../../../utils/Helper"
import {SET_END_YEAR} from "../../../utils/action"
import "./style.css"


export default function StartDateMenu(props) {

    const [state, dispatch] = useSimpleInvestmentContext()

    const getAvailableYears = () => {
        if (state.history) {
            return Helper.findAvailableYears(state.history).filter(year => eval(year) > eval(state.startYear))
        }
        return []
    }

    const handleSelection = (year) => {
        dispatch({type: SET_END_YEAR, endYear: year})
    }


    if (state.activeForm < 2 || state.simulationStarted) {
        return null
    }

    else if (!state.endYear) {

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
                    name={state.endYear}
                    active={true}
                />
            </Menu>
        )
    }





}