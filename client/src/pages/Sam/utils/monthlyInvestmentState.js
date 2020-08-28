import React, { createContext, useContext, useReducer } from "react"
import { SET_ANNUAL_INCOME, SET_MONTHLY_INVESTMENT, ADD_MONTHLY_EXPENSE, CLEAR } from "./actions"

const MonthlyInvestmentContext = createContext()

const reducer = (state, action) => {
    switch (action.type) {
        case SET_ANNUAL_INCOME:
            return {...state, annualIncome: action.annualIncome}

        case SET_MONTHLY_INVESTMENT:
            return {...state, monthlyInvestment: action.monthlyInvestment}

        case ADD_MONTHLY_EXPENSE:
            return {...state, monthlyExpenses: [...state.monthlyExpenses, action.newExpense]}

        case SET_PARAMS:
            return {...state, annualIncome: action.annualIncome, monthlyInvestment: action.monthlyInvestment, monthlyExpenses: [...state.monthlyExpenses, action.monthlyExpenses]}

        case CLEAR:
            return {
                annualIncome: 0,
                monthlyInvestment: 0,
                monthlyExpenses: []
            }

    }
}

function MonthlyInvestmentProvider({ value = [], ...props }) {
    const [state, dispatch] = useReducer(reducer, {
        annualIncome: 0,
        monthlyInvestment: 0,
        monthlyExpenses: [],
    })

    return <Provider value={[state, dispatch]} {...props} />
}

function useMonthlyInvestmentContext() {
    return useContext(MonthlyInvestmentContext)
}

export { MonthlyInvestmentProvider, useMonthlyInvestmentContext }

