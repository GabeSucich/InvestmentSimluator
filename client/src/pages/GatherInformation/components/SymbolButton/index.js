import React from 'react'
import { FluidContainer } from "../../../../SemanticUI/Containers"
import { Grid, Segment, Button } from "semantic-ui-react"
import "./style.css"

function SymbolButton({ name, symbol, onClick, ...props }) {

    console.log(symbol)
    return (
        <Button fluid
            value={symbol}
            onClick={() => {
                onClick(symbol)
            }}
            {...props}
        >
            {name}
        </Button>
    )

}

export default function SymbolButtonList({ symbolArr, onClick, shuffleStocks, ...props }) {

    return (
        <FluidContainer>
            <Segment textAlign="center">
                <Grid centered>
                    {symbolArr.map(stock => {

                        return (
                            <Grid.Row>
                                <Grid.Column width={12} className="btn-column">
                                    <SymbolButton
                                        name={stock.name}
                                        symbol={stock.symbol}
                                        onClick={onClick}
                                        {...props}
                                    />
                                </Grid.Column>
                            </Grid.Row>
                        )
                    })}

                </Grid>
            </Segment>
            <Button color="green" onClick={shuffleStocks}>More stocks</Button>
        </FluidContainer>
    )


}