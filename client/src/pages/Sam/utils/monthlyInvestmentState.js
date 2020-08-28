import React, { createContext, useContext, useReducer } from "react"
import { READY_UP, SET_ANNUAL_INCOME, SET_MONTHLY_INVESTMENT, ADD_MONTHLY_EXPENSE, UPDATE_ADJUSTED_MONTHLY_INVESTMENT, CLEAR } from "./actions"

const MonthlyInvestmentContext = createContext()
const { Provider } = MonthlyInvestmentContext

const reducer = (state, action) => {
    switch (action.type) {
        case SET_ANNUAL_INCOME:
            return {...state, annualIncome: action.annualIncome}

        case SET_MONTHLY_INVESTMENT:
            return {...state, monthlyInvestment: action.monthlyInvestment}

        case ADD_MONTHLY_EXPENSE:
            return {...state, monthlyExpenses: [...state.monthlyExpenses, action.newExpense]}

        case READY_UP:
            return {...state, ready: true}

        case UPDATE_ADJUSTED_MONTHLY_INVESTMENT:
            var newAdjustedMonthlyInvestment = state.monthlyInvestment
            for (const expense of state.monthlyExpenses) {
                newAdjustedMonthlyInvestment -= expense
            }
            return {...state, adjustedMonthlyInvestment: newAdjustedMonthlyInvestment}

        case CLEAR:
            return {
                annualIncome: 0,
                monthlyInvestment: 0,
                monthlyExpenses: [],
                adjustedMonthlyInvestment: 0
            }

    }
}

function MonthlyInvestmentProvider({ value = [], ...props }) {
    const [state, dispatch] = useReducer(reducer, {
        annualIncome: 0,
        monthlyInvestment: 0,
        monthlyExpenses: [],
        adjustedMonthlyInvestment: 0,
        ready: false
    })

    return <Provider value={[state, dispatch]} {...props} />
}

function useMonthlyInvestmentContext() {
    return useContext(MonthlyInvestmentContext)
}

export { MonthlyInvestmentProvider, useMonthlyInvestmentContext }

