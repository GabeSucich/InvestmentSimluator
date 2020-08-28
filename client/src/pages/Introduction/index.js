import React from 'react'
import { Container, Grid, Segment, Image } from "semantic-ui-react"
import Logo from '../../components/Logo'
import "./style.css"

export default function Introduction() {

    return (
        <Container textAlign="center">


            <Segment fluid inverted textAlign="center" className="margin-above">
                <h1>Welcome to QUAN</h1>
            </Segment>

            <Grid divided columns={3} stackable>
                <Grid.Column>
                    <Segment inverted fluid textAlign="center">
                        <h3>What is QUAN?</h3>
                    </Segment>
                    <Segment fluid className="body-text">
                        QUAN aims to beat away the cloud of confusion that for many people mires the world of investing. We deliver information about investing through
                        tiered modules which are aimed at investors with varying levels of exposure to the stock market. Our development team itself is composed of members with
                        investing experience ranging from novice to expoert, and so we are empathetic to the various comfort levels that our users might have. Our project mirrors
                        this range. At the simplest level, users can select a stock, time period, and investment, and observe how their investment will change over time. On the other side
                        of the spectrum, more seasoned investors can customize and active trading strategy with buy and sell paramters to see if stock investing can be optimized with more active
                        trading. We hope to allow investors to feel more confident when dealing with the stock market, no matter their level of previous experience.
                    </Segment>
                </Grid.Column>
                <Grid.Column>
                    <Segment inverted fluid textAlign="center">
                        <h3>How does QUAN Work?</h3>
                    </Segment>
                    <Segment fluid className="body-text">
                        Though historical stock market data is publically accessible, a long list of dates and numbers does not have meaning for most. At its core, QUAN is a translator between user
                        inquiry about the stock market and this data. We operate by running detailed an accurate <span className="bold">simulations</span> on historical data. Users customize a hypothetical,
                        retrospective investing scenario in each module. QUAN takes this customized information and runs its flexible, detailed, and accurate simulation using this data in conjunction with
                        20+ years of historical stock data. This transforms long colums of bland data into engaging visuals depicting the results of user-customized investments. It is through this medium that
                        we hope to enlighten users about what could happen in the future by illuminating what did happen in the past
                    </Segment>
                </Grid.Column>
                <Grid.Column>
                    <Segment inverted fluid textAlign="center">
                        <h3>Why make QUAN?</h3>
                    </Segment>
                    <Segment fluid className="body-text">
                        Between 2010 and 2020, the average return on investment from hedge funds was only about 8.5%. These hedge funds typically charge investors 17-20% on yearly profits. This isn't bad,
                        until you compare it to the S&P 500 -- a popular index for the market -- which over that same time period saw a yearly average increase of over 12%. Any investor choosing to give money to a hedge fund in 2010 would have
                        most likely seen a larger return over the last decade had they invested their money independently into the market. These hedge funds are charging investors a pretty penny because to many, the 
                        stock market seems "too risky" or "too scary". These uninformed investors give their money to a hedge fund, and are paid back 60 cents on the dollar compared to if they had invested independently.
                        QUAN's goal is to alleviate this lack of information.
                    </Segment>
                </Grid.Column>

            </Grid>
            <Grid>
                
                
            </Grid>



        </Container>
    )



}