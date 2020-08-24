import React, {createContext, useContext, useReducer} from "react"
import {INVALID, SET_STOCK, SET_START_DATE, SET_END_DATE, SYMBOL_LOADING, START_DATE_LOADING, SET_INVESTMENT, END_DATA_LOADING, INVESTMENT_LOADING, SET_HISTORY, CLEAR_DATA, LOAD_SIMULATION, SET_SIMULATION_DATA} from "./action"

const SimpleInvestmentContext = createContext()
const {Provider} = SimpleInvestmentContext

const reducer = (state, action) => {
    switch (action.type) {
        case SET_STOCK:
            return {...state, symbol: action.symbol, symbolLoading: false, activeForm: 1}
            break
        case SYMBOL_LOADING:
            return {...state, symbolLoading: true}
            break
        case SET_START_DATE:
            return {...state, startDate: action.startDate, activeForm: 2}
            break
        case SET_END_DATE:
            return {...state, endDate: action.endDate, activeForm: 3}
            break
        case SET_INVESTMENT:
            return {...state, investment: eval(action.investment).toFixed()}
        case SET_HISTORY:
            return {...state, history: action.history}
            break
        case LOAD_SIMULATION:
            return {...state, simulationStarted: true}
            break
        case SET_SIMULATION_DATA:
            return {...state, simulationData: action.data}
        case CLEAR_DATA: 
            return {
                activeForm: 0,
                symbol: null,
                startDate: null, 
                endDate: null,
                investment: null,
                symbolLoading: false,
                startDateLoading: false,
                endDateLoading: false,
                investmentLoading: false,
                history: null,
                simulationStarted: false,
                simulationData: null
                
            }
            break
        case INVALID:
            return {...state, symbolLoading: false}
    }
}

function SimpleInvestmentProvider({value=[], ...props}) {
    const [state, dispatch] = useReducer(reducer, { 
        activeForm: 0,
        symbol: null,
        startDate: null, 
        endDate: null,
        investment: null,
        symbolLoading: false,
        startDateLoading: false,
        endDateLoading: false,
        investmentLoading: false,
        history: null,
        simulationStarted: false,
        simulationData: null
        
    })

    return <Provider value={[state, dispatch]} {...props}/>
}

function useSimpleInvestmentContext() {
    return useContext(SimpleInvestmentContext)
}

export {SimpleInvestmentProvider, useSimpleInvestmentContext}

