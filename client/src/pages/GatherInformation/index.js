import React from 'react'
import { SimpleInvestmentProvider } from "./utils/GlobalState"
import { Grid, Container } from "semantic-ui-react"
import { FluidContainer} from "../../SemanticUI/Containers"
import SymbolForm from "./components/Forms/SymbolForm"
import StartDateDropdown from "./components/Dropdowns/StartDateDropdown"
import EndDateDropdown from "./components/Dropdowns/EndDateDropdown"
import InvestmentForm from "./components/Forms/InvestmentForm"
import SimpleInvestment from "../SimpleInvestment"
import ActiveTrading from "../ActiveTrading"
import TaxEffect from "../TaxExample"
import "./style.css"
import { ActiveTradingProvider } from '../ActiveTrading/utils/ActiveState'
import RangeFormBL from '../ActiveTrading/components/Forms/BuyLow/index'
import RangeFormBH from '../ActiveTrading/components/Forms/BuyHigh/index'
import RangeFormSH from '../ActiveTrading/components/Forms/SellHigh/index'
import RangeFormSL from '../ActiveTrading/components/Forms/SellLow/index'
import ActRunBtn from '../ActiveTrading/components/Buttons/index'


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
              

    {/* Testing Active Trading input fields */}
            < ActiveTradingProvider>
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
            </ActiveTradingProvider>

            {props.pathname === "/" ?  <ActiveTrading /> : null}
             {/* {props.pathname === "/simple" ?  <SimpleInvestment /> : null} */}
             {/* {props.pathname === "Sam" ? <SamsComponent/> : null} */}
            {/* </AlignedContainer> */}
            
             {props.pathname === "/basic" ?  <SimpleInvestment /> : null}
             {props.pathname === "/tax" ? <TaxEffect/> : null}
            </Container>
        </SimpleInvestmentProvider>
    )

}