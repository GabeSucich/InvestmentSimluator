import React from 'react'
import { Grid, Container } from "semantic-ui-react"
import SymbolForm from "./components/Forms/SymbolForm"
import StartDateDropdown from "./components/Dropdowns/StartDateDropdown"
import EndDateDropdown from "./components/Dropdowns/EndDateDropdown"
import InvestmentForm from "./components/Forms/InvestmentForm"
import SimpleInvestment from "../SimpleInvestment"
import ActiveTrading from "../ActiveTrading"
import TaxEffect from "../TaxExample"
import MonthlyInvestment from "../Sam"
import "./style.css"

export default function GatherInformation({ pathname }) {

    return (
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

                {/* {pathname === "/basic" ? <SimpleInvestment /> : null}
                {pathname === "/tax" ? <TaxEffect /> : null}
                {pathname === "/monthly"} ? 
                {pathname === "/active" ? <ActiveTrading /> : null} */}

                {pathname === "/active" ? <ActiveTrading /> : null}
                {pathname === "/basic" ? <SimpleInvestment/> : null}
                {pathname === "/tax" ? <TaxEffect/> : null}
                {pathname === "/monthly" ? <MonthlyInvestment/> : null}
                {/* {props.pathname === "/basic" ? <SimpleInvestment /> : null}
                {props.pathname === "/tax" ? <TaxEffect /> : null} */}

                {/* Testing Active Trading input fields */}
                {/* < ActiveTradingProvider>
                <Container className="large-container">
                <Grid centered>
                    <Grid.Column width={4}>
                        <RangeFormBL /> 
                        <RangeFormBH /> 
                        <RangeFormSL /> 
                        <RangeFormSH /> 
                        <ActRunBtn /> 
                    </Grid.Column>
                </Grid>
                </Container>
            </ActiveTradingProvider> */}


            </Container>
    )

}