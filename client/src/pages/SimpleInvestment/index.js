import React from 'react'
import { SimpleInvestmentProvider } from "./utils/SimpleInvestmentState"
import { Grid } from "semantic-ui-react"
import { AlignedContainer } from "../../SemanticUI/Containers"
import SymbolForm from "./components/Forms/SymbolForm"
import StartDateDropdown from "./components/Dropdowns/StartDateDropdown"
import EndDateDropdown from "./components/Dropdowns/EndDateDropdown"
import InvestmentForm from "./components/Forms/InvestmentForm"
import SimulationDisplay from "./components/SimulationDisplay"
import "./style.css"


export default function SimpleInvestment() {


    return (
        <SimpleInvestmentProvider>
            <AlignedContainer className="large-container">
                <Grid centered>
                    <Grid.Column width={4}>
                        <SymbolForm />
                    </Grid.Column>
                    <Grid.Column width={4}>
                        <StartDateDropdown />
                    </Grid.Column>
                    <Grid.Column width={4}>
                        <EndDateDropdown />
                    </Grid.Column>
                    <Grid.Column width={4}>
                        <InvestmentForm />
                    </Grid.Column>
                </Grid>

                <SimulationDisplay />
            </AlignedContainer>



        </SimpleInvestmentProvider>
    )

}