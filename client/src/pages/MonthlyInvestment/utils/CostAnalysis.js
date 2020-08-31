import React, { useState } from "react"
import { useMonthlyInvestmentContext } from "./monthlyInvestmentState"
import { Segment, Input, Button, Container } from 'semantic-ui-react'


export default function CostAnalysis(props) {

    const [state, dispatch] = useMonthlyInvestmentContext();

    const { simulations } = props
    const valueDifference = (simulations[0].finalValue - simulations[1].finalValue).toFixed(0)

    console.log(props.greatestExpensePercentage)

    return (
        <Container>
            <Segment fluid>
            <p>In total, your unnecessary expenses lost you ${valueDifference} over the allotted time frame</p>
        </Segment>
        <Segment fluid>
            <p>Your biggest expense was {props.greatestExpenseName}, which lost you a total of ${(props.greatestExpensePercentage * valueDifference).toFixed(0)}</p>
        </Segment>
        </Container>

    )
}