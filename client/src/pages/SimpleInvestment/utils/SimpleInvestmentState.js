import React, {createContext, useContext, useReducer} from "react"
import {NEW_ACTIVE_FORM, SELECT_STOCK, SELECT_START_DATE, SELECT_END_DATE, SYMBOL_LOADING, START_DATE_LOADING, SET_INVESTMENT, END_DATA_LOADING, INVESTMENT_LOADING, SET_HISTORY, CLEAR_DATA, LOAD_SIMULATION, SET_SIMULATION_DATA} from "./action"

const SimpleInvestmentContext = createContext()
const {Provider} = SimpleInvestmentContext

const reducer = (state, action) => {
    switch (action.type) {
        case NEW_ACTIVE_FORM:
            return {...state, activeForm: action.activeForm}
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
            return {...state, endDate: action.endDate, endDateLoading: false}
            break
        case END_DATA_LOADING:
            return {...state, endDateLoading: true}
            break
        case SET_INVESTMENT:
            return {...state, investment: eval(action.investment).toFixed(), investmentLoading: false}
        case INVESTMENT_LOADING:
            return {...state, endDateLoading: false, investmentLoading: false}
            break
        case SET_HISTORY:
            return {...state, data: action.history}
            break
        case LOAD_SIMULATION:
            return
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
                history: null,
                simulationStarted: false,
                simulationData: null
                
            }
            break
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
       
        data: null,
        
    })

    return <Provider value={[state, dispatch]} {...props}/>
}

function useSimpleInvestmentContext() {
    return useContext(SimpleInvestmentContext)
}

export {SimpleInvestmentProvider, useSimpleInvestmentContext}

