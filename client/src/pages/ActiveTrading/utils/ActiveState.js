import React, {createContext, useContext, useReducer} from "react"
import { SET_BUYLOW, SET_BUYHIGH, SET_SELLLOW, SET_SELLHIGH, SYMBOL_LOADING, CLEAR_DATA, INVALID } from '../utils/activeAction'

const ActiveTradingContext = createContext()
const {Provider} = ActiveTradingContext

const reducer = (state, action) => {
    switch (action.type) {
        case SET_BUYLOW:
            return { ...state, buyLow: action.buyLow }
            break
        case SET_BUYHIGH:
            return { ...state, buyHigh: action.buyHigh }
            break
        case SET_SELLLOW:
            return { ...state, sellLow: action.sellLow }
            break
        case SET_SELLHIGH:
            return { ...state, sellHigh: action.sellHigh }
            break
        case SYMBOL_LOADING:
            return { ...state, symbolLoading: true }
            break
        case CLEAR_DATA:
            return {
                buyLow: null,
                buyHigh: null,
                sellLow: null,
                sellHigh: null,
                symbolLoading: false
            }
            break
        case INVALID:
            return { ...state, symbolLoading: false }
    }
}

function ActiveTradingProvider({value=[], ...props}) {
    const [state, dispatch] = useReducer(reducer, { 
        buyLow: null,
        buyHigh: null,
        sellLow: null,
        sellHigh: null,
        symbolLoading: false
    })

    return <Provider value={[state, dispatch]} {...props}/>
}

function useActiveTradingContext() {
    return useContext(ActiveTradingContext)
}

export {ActiveTradingProvider, useActiveTradingContext}