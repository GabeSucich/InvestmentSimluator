import React from 'react'
import { SimpleInvestmentProvider } from "./utils/SimpleInvestmentState"
import SymbolForm from "./components/Forms/SymbolForm"
import StartDateForm from "./components/Forms/StartDateForm"


export default function SimpleInvestment() {


    return (
        <SimpleInvestmentProvider>
            <SymbolForm/>
            <StartDateForm/>
        </SimpleInvestmentProvider>
    )

}