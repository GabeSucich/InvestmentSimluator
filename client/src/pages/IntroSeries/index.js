import React, { useState } from 'react'
import { Container, Grid, Button, Segment, Image } from "semantic-ui-react"
import { useUserContent } from "../../utils/UserState"
import Intro from "./intro.json"

export default function IntroSeries(props) {

    const [currentPage, setCurrentPage] = useState(0)
    const [userState, userDispatch] = useUserContent()

    const handleNext = () => {
        setCurrentPage(currentPage + 1)
    }

    const handlePrev = () => {
        setCurrentPage(currenPage - 1)
    }

    return (
        <Container textAlign="center">
            <Grid centered>
                <Grid.Column mobile={16} tablet={10} computer={8}>
                    <Grid.Row centered>
                        <Image fluid src={require("../../assets/" + Intro[currentPage].image)} />
                    </Grid.Row>
                    <Grid.Row>
                        <Segment textAlign="center">
                            {Intro[currentPage].description}
                        </Segment>
                    </Grid.Row>

                </Grid.Column>
            </Grid>
        </Container>
    )

}