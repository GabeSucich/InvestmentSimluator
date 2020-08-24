import React, {createContext, useContext, useReducer} from "react"
import {SELECT_STOCK, SELECT_START_DATE, SELECT_END_DATE, SYMBOL_LOADING, START_DATE_LOADING, SET_INVESTMENT, END_DATA_LOADING, INVESTMENT_LOADING, SET_DATA, CLEAR_DATA} from "./action"

const SimpleInvestmentContext = createContext()
const {Provider} = SimpleInvestmentContext

const reducer = (state, action) => {
    switch (action.type) {
        case SELECT_STOCK:
            return {...state, symbol: action.symbol, symbolLoading: false}
            break
        case SYMBOL_LOADING:
            return {...state, symbolLoading: true}
            break
        case SELECT_START_DATE:
            return {...state, startDate: action.startDate, startDateLoading: false}
            break
        case START_DATE_LOADING:
            return {...state, startDateLoading: true}
            break
        case SELECT_END_DATE:
            return {...state, endDate: action.endDate, endDateLoading: fals}
            break
        case END_DATA_LOADING:
            return {...state, endDateLoading: true}
            break
        case SET_INVESTMENT:
            return {...state, investment: eval(action.investment).toFixed(), investmentLoading: false}
        case INVESTMENT_LOADING:
            return {...state, endDateLoading: false, investmentLoading: false}
            break
        case SET_DATA:
            return {...state, data: action.data}
            break
        case CLEAR_DATA: 
            return {
                symbol: null,
                startDate: null, 
                endDate: null,
                investment: null,
                symbolLoading: false,
                startDateLoading: false,
                endDateLoading: false,
                investmentLoading: false,
                data: null,
                
            }
            break
    }
}

function SimpleInvestmentProvider({value=[], ...props}) {
    const [state, dispatch] = useReducer(reducer, {
        symbol: null,
        startDate: null, 
        endDate: null,
        initialInvestment: null,
        loading: false,
        data: null,
    })

    return <Provider value={[state, dispatch]} {...props}/>
}

function useSimpleInvestmentContext() {
    return useContext(SimpleInvestmentContext)
}

export {SimpleInvestmentProvider, useSimpleInvestmentContext}

