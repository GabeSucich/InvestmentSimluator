import React, { createContext, useContext, useReducer } from "react"
import { READY_UP, SET_ANNUAL_INCOME, SET_MONTHLY_INVESTMENT, ADD_MONTHLY_EXPENSE, SET_PARAMS, CLEAR } from "./actions"

const MonthlyInvestmentContext = createContext()
const { Provider } = MonthlyInvestmentContext

const reducer = (state, action) => {
    switch (action.type) {
        case SET_ANNUAL_INCOME:
            return {...state, annualIncome: action.annualIncome}

        case SET_MONTHLY_INVESTMENT:
            return {...state, monthlyInvestment: action.monthlyInvestment}

        case ADD_MONTHLY_EXPENSE:
            var newAdjustedMonthlyInvestment = state.monthlyInvestment - action.newExpense;
            for (const expense in state.monthlyExpenses) {
                newAdjustedMonthlyInvestment -= expense
            }
            return {...state, monthlyExpenses: [...state.monthlyExpenses, action.newExpense], adjustedMonthlyInvestment: newAdjustedMonthlyInvestment}

        case SET_PARAMS:
            return {...state, annualIncome: action.annualIncome, monthlyInvestment: action.monthlyInvestment, monthlyExpenses: [...state.monthlyExpenses, action.monthlyExpenses], adjustedMonthlyInvestment: action.adjustedMonthlyInvestment}

        case READY_UP:
            return {...state, ready: true}

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

