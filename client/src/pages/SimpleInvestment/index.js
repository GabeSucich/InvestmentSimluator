import React from 'react'
import { SimpleInvestmentProvider } from "./utils/SimpleInvestmentState"
import SymbolForm from "./components/Forms/SymbolForm"
import StartDateMenu from "./components/Menus/StartDateMenu"
import EndDateMenu from "./components/Menus/EndDateMenu"
import InvestmentForm from "./components/Forms/InvestmentForm"
import SimulationDisplay from "./components/SimulationDisplay"


export default function SimpleInvestment() {


    return (
        <SimpleInvestmentProvider>
            <SymbolForm/>
            <StartDateMenu/>
            <EndDateMenu/>
            <InvestmentForm/>
            <SimulationDisplay/>
        </SimpleInvestmentProvider>
    )

}