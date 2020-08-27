import React from 'react'
import { SimpleInvestmentProvider } from "./utils/GlobalState"
import { Grid, Container } from "semantic-ui-react"
import { FluidContainer} from "../../SemanticUI/Containers"
import SymbolForm from "./components/Forms/SymbolForm"
import StartDateDropdown from "./components/Dropdowns/StartDateDropdown"
import EndDateDropdown from "./components/Dropdowns/EndDateDropdown"
import InvestmentForm from "./components/Forms/InvestmentForm"
import SimpleInvestment from "../SimpleInvestment"
import TaxEffect from "../TaxExample"
import "./style.css"


export default function GatherInformation(props) {

    return (
        <SimpleInvestmentProvider>
            <Container className="large-container">
                <Grid centered>
                    <Grid.Column mobile={8} tablet={8} computer={4} textAlign="center">
                        <SymbolForm />
                    </Grid.Column>
                    <Grid.Column mobile={8} tablet={8} computer={4} textAlign="center">
                        <StartDateDropdown />
                    </Grid.Column>
                    <Grid.Column mobile={8} tablet={8} computer={4} textAlign="center">
                        <EndDateDropdown />
                    </Grid.Column>
                    <Grid.Column mobile={8} tablet={8} computer={4} textAlign="center">
                        <InvestmentForm />
                    </Grid.Column>
                </Grid>
            
             {props.pathname === "/basic" ?  <SimpleInvestment /> : null}
             {props.pathname === "/tax" ? <TaxEffect/> : null}
            </Container>
        </SimpleInvestmentProvider>
    )

}