import React, {createContext, useContext, useReducer} from "react"
import {  SET_PARAMS , CLEAR_DATA, } from '../utils/activeAction'

const ActiveTradingContext = createContext()
const {Provider} = ActiveTradingContext

const reducer = (state, action) => {
    switch (action.type) {
        case SET_PARAMS:
            return { ...state, buyLow: action.buyLow, buyHigh: action.buyHigh, sellLow: action.sellLow, sellHigh: action.sellHigh }
           
        // case SET_BUYHIGH:
        //     return { ...state, buyHigh: action.buyHigh }
          
        // case SET_SELLLOW:
        //     return { ...state, sellLow: action.sellLow }
           
        // case SET_SELLHIGH:
        //     return { ...state, sellHigh: action.sellHigh }
       
       
        case CLEAR_DATA:
            return {
                buyLow: null,
                buyHigh: null,
                sellLow: null,
                sellHigh: null,
            }
            break
}

function ActiveTradingProvider({value=[], ...props}) {
    const [state, dispatch] = useReducer(reducer, { 
        buyLow: null,
        buyHigh: null,
        sellLow: null,
        sellHigh: null,
    })

    return <Provider value={[state, dispatch]} {...props}/>
}

function useActiveTradingContext() {
    return useContext(ActiveTradingContext)
}

export {ActiveTradingProvider, useActiveTradingContext}