import React from "react"
import { MonthlyInvestmentProvider } from "./utils/monthlyInvestmentState"
import MonthlyInvestmentPage from "./page"

function MonthlyInvestment() {

    return (
        <MonthlyInvestmentProvider>
            <MonthlyInvestmentPage/>
        </MonthlyInvestmentProvider>
    )
}

export default MonthlyInvestment