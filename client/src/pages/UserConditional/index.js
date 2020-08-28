import React, { useState, useEffect } from 'react';
import { useUserContent } from "../../utils/UserState"
import GatherInformation from "../GatherInformation"
import { Container } from "semantic-ui-react"
import NavMenu from "../../components/NavMenu"
import Navbar from "../../components/Navbar"
import { Grid } from "semantic-ui-react"
import UserAuthentication from "../UserAuthentication"
import InstructionsAccordion from '../../components/InstructionsAccordion';
import Introduction from "../Introduction"
import { InformationProvider } from '../GatherInformation/utils/InformationState';
import IntroSeries from '../IntroSeries';

export default function UserConditional({ pathname }) {

    const [userState, userDispatch] = useUserContent()

    // if (userState.awaitingIntro) {
    //     return ()
    // }

    if (userState.awaitingIntro) {
        return (
            <IntroSeries/>
        )
    }

    if (userState.user) {
        return (
            <InformationProvider>
                <Container fluid>
                    <Grid only="mobile" >
                        <Grid.Column width={16} only="mobile">
                            <Navbar />
                        </Grid.Column>
                    </Grid>
                    <Grid>
                        <Grid.Row className="whole-view">
                            <Grid.Column stretched tablet={5} computer={3} only="tablet computer" >
                                {/* <Rail position="left"> */}
                                <NavMenu />
                                {/* </Rail> */}
                            </Grid.Column>

                            <Grid.Column stretched mobile={16} tablet={11} computer={13} className="display">
                                <Container fluid>
                                    {pathname === "/" ? <Introduction /> : null}
                                    {pathname === "/basic" ?
                                        <Container fluid>
                                            <InstructionsAccordion pageName="SimpleInvestment" />
                                            <GatherInformation pathname="/basic" />
                                        </Container>
                                        : null}
                                    {pathname === "/tax" ?
                                        <Container fluid>
                                            <InstructionsAccordion pageName="TaxEffects" />
                                            <GatherInformation pathname="/tax" />
                                        </Container>
                                        : null}
                                    {pathname === "/monthly" ?
                                        <Container fluid>
                                            <InstructionsAccordion pageName="MonthlyInvestment" />
                                            <GatherInformation pathname="/monthly" />
                                        </Container>
                                        : null}
                                    {pathname === "/active" ?
                                        <Container fluid>
                                            <InstructionsAccordion pageName="ActiveTrading" />
                                            <GatherInformation pathname="/active" />
                                        </Container>
                                        : null}
                                </Container>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Container>
            </InformationProvider>
        )
    }


    else {
        return <UserAuthentication />
    }

}