import React, { useState, useEffect } from 'react'
import { useInformationContext } from "../../../utils/InformationState"
import { StandardForm, LoadingForm} from "../../../../../SemanticUI/Forms"
import { Form, Button, Segment, Menu } from "semantic-ui-react"
import API from "../../../../../utils/API"
import { SYMBOL_LOADING, SET_STOCK, SET_HISTORY, INVALID } from "../../../utils/action"
import SymbolButtonList from "../../SymbolButton"
import stockRandomizer from "../../../../../utils/stockRandomizer"

export default function SymbolForm(props) {

    const [state, dispatch] = useInformationContext()
    const [invalid, setInvalid] = useState(false)
    const [symbol, setSymbol] = useState("")
    const [stockSelection, setStockSelection] = useState(stockRandomizer())

    useEffect(() => {
        setStockSelection(stockRandomizer())
    }, [])

    const shuffleStocks = () => {
        setStockSelection(stockRandomizer())
    }

    const handleOnChange = (event, { value }) => {
        setSymbol(value)
    }

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

                    dispatch({ type: SET_HISTORY, history: response.data.historicals })
                    dispatch({ type: SET_STOCK, symbol: uppercaseSymbol })
                })
            }
        })
    }

    if (state.informationGathered) {
        return null
    }
    else if (state.activeForm === 0 && !state.symbolLoading) {
        return (
            <Segment textAlign="center">
                <StandardForm>
                    <Form.Input
                        placeholder="Stock Ticker"
                        label="Input the stock ticker for a stock to simulation. If you are unfamiliar with stock symbols, some are provided below!"
                        value={symbol}
                        onChange={handleOnChange}
                    />
                    {invalid ? <Button disabled color="red" fluid>Not a valid symbol!</Button> : <Button onClick={handleSubmit} color="olive">Set Symbol</Button>}
                </StandardForm>
                <br/>
                {invalid ? null : <SymbolButtonList symbolArr={stockSelection} shuffleStocks={shuffleStocks} onClick={setSymbol}/>}
            </Segment>

        )
    }

    else if (state.activeForm === 0 && state.symbolLoading) {
        return (
            <Segment textAlign="center">
                <LoadingForm>
                    <Form.Input
                        placeholder="Stock Ticker"
                        label="Input the stock ticker for a stock to simulation. If you are unfamiliar with stock symbols, some are provided below!"
                        value={symbol}
                        onChange={handleOnChange}
                    />
                </LoadingForm>
            </Segment>
        )
    }

    else {
        return (
            <Segment color="olive" textAlign="center">
                <Menu vertical disabled fluid>
                    <Menu.Item
                        name={state.symbol}
                        active={true}
                    />
                </Menu>
            </Segment>
        )
    }

}