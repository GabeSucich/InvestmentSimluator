import React, { createContext, useContext, useReducer } from "react"
import { GREATEST_COST_NAME, GREATEST_COST_PERCENTAGE, READY_UP, SET_ANNUAL_INCOME, SET_MONTHLY_INVESTMENT, ADD_MONTHLY_EXPENSE, UPDATE_ADJUSTED_MONTHLY_INVESTMENT, CLEAR } from "./actions"

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
                newAdjustedMonthlyInvestment -= expense.cost
            }
            return {...state, adjustedMonthlyInvestment: newAdjustedMonthlyInvestment}

        case GREATEST_COST_NAME:
            var greatestExpense = {cost: 0, name: "undefined"};
            for (const expense of state.monthlyExpenses) {
                if (expense.cost > greatestExpense.cost) {
                    greatestExpense = expense;
                }
            }
            return {...state, greatestExpenseName: greatestExpense.name}

        case GREATEST_COST_PERCENTAGE:
            greatestExpense = 0;
            var totalExpense = 0;
            for (const expense of state.monthlyExpenses) {
                totalExpense += parseInt(expense.cost);
                if (parseInt(expense.cost) > parseInt(greatestExpense)) {
                    greatestExpense = parseInt(expense.cost);
                }
            }
            console.log(greatestExpense)
            console.log(totalExpense)
            return {...state, greatestExpensePercentage: greatestExpense/totalExpense}

        case CLEAR:
            return {
                annualIncome: 0,
                monthlyInvestment: 0,
                monthlyExpenses: [],
                adjustedMonthlyInvestment: 0,
                greatestExpenseName: null,
                greatestExpensePercentage: null
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

