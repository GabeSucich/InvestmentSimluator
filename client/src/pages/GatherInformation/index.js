import React from 'react'
import { SimpleInvestmentProvider } from "./utils/GlobalState"
import { Grid } from "semantic-ui-react"
import { AlignedContainer } from "../../SemanticUI/Containers"
import SymbolForm from "./components/Forms/SymbolForm"
import StartDateDropdown from "./components/Dropdowns/StartDateDropdown"
import EndDateDropdown from "./components/Dropdowns/EndDateDropdown"
import InvestmentForm from "./components/Forms/InvestmentForm"
import SimpleInvestment from "../SimpleInvestment"
import "./style.css"


export default function GatherInformation(props) {

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
            
             {props.pathname === "/basic" ?  <SimpleInvestment /> : null}  
            </AlignedContainer>



        </SimpleInvestmentProvider>
    )

}