import React, { useState, useEffect } from 'react';
import { UserProvider, useUserContent } from "../../utils/UserState"
import TaxEffect from "../TaxExample"
import GatherInformation from "../GatherInformation"
import { Container } from "semantic-ui-react"
import NavMenu from "./components/NavMenu"
import Navbar from "./components/Navbar"
import { Rail, Grid } from "semantic-ui-react"
import "./App.css"
import 'semantic-ui-css/semantic.min.css'

export default function UserConditional({pathname}) {

    const [userState, userDispatch] = useUserContent()

    if (userState.user) {
        return (
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

                                { pathname === "/" ? null : <GatherInformation pathname={pathname} />}

                            </Container>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        )
    }


    else {
        return null
    }

}