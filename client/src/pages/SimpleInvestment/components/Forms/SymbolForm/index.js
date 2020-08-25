import React, { useState } from 'react'
import { useSimpleInvestmentContext } from "../../../utils/SimpleInvestmentState"
import { StandardForm, LoadingForm} from "../../../../../SemanticUI/Forms"
import { Form, Button } from "semantic-ui-react"
import API from "../../../../../utils/API"
import { SYMBOL_LOADING, SET_STOCK, SET_HISTORY, INVALID } from "../../../utils/action"

export default function SymbolForm(props) {

    const [state, dispatch] = useSimpleInvestmentContext()
    const [invalid, setInvalid] = useState(false)
    const [symbol, setSymbol] = useState("")

    const handleOnChange = (event, { value }) => {
        setSymbol(value)
    }
    console.log(state)
    const handleSubmit = (event, { value }) => {
        event.preventDefault()
        const uppercaseSymbol = symbol.toUpperCase()
        dispatch({ type: SYMBOL_LOADING })
        API.validateStockSymbol(uppercaseSymbol).then(isValid => {
            if (!isValid) {
                dispatch({ type: INVALID })
                setSymbol("")
                setInvalid(true)
                setTimeout(() => {
                    setInvalid(false)
                }, 1500)
            }
            else {
                
                API.getStockData(uppercaseSymbol).then(response => {
                    console.log(response.data.historicals)
                    dispatch({ type: SET_HISTORY, history: response.data.historicals })
                    dispatch({ type: SET_STOCK, symbol: uppercaseSymbol })
                })
            }
        })
    }

    if (state.simulationStarted) {
        return null
    }
    else if (state.activeForm === 0 && !state.symbolLoading) {
        return (
            <StandardForm>
                <Form.Input
                    placeholder="Stock Ticker"
                    label="Input the stock ticker for a stock to simulation. If you are unfamiliar with stock symbols, some are provided below!"
                    value={symbol}
                    onChange={handleOnChange}
                />
                <Button onClick={handleSubmit}>Validate Ticker</Button>
            </StandardForm>
        )
    }

    else if (state.activeForm === 0 && state.symbolLoading) {
        return (
            <LoadingForm>
                <Form.Input
                    placeholder="Stock Ticker"
                    label="Input the stock ticker for a stock to simulation. If you are unfamiliar with stock symbols, some are provided below!"
                    value={symbol}
                    onChange={handleOnChange}
                />
            </LoadingForm>
        )
    }

    else {
        return (
            <StandardForm>
                <Form.Input
                    placeholder="Stock Ticker"
                    value={symbol.toUpperCase()}
                    onChange={handleOnChange}
                    disabled
                />
            </StandardForm>
        )
    }

}