import React, { useState } from 'react'
import { Container, Grid, Button, Segment, Image, Icon } from "semantic-ui-react"
import { useUserContent } from "../../utils/UserState"
import { LOGIN_USER } from "../../utils/action"
import Intro from "./intro.json"
import { AnimatedIconButton } from '../../SemanticUI/Buttons'
import "./style.css"


export default function IntroSeries(props) {

    const [currentPage, setCurrentPage] = useState(0)
    const [userState, userDispatch] = useUserContent()

    const handleNext = () => {
        setCurrentPage(currentPage + 1)
    }

    const handlePrev = () => {
        setCurrentPage(currentPage - 1)
    }

    const enterSite = () => {
        userDispatch({ type: LOGIN_USER, username: userState.user })
    }

    const getSRC = (image) => {
        return require("../../assets/" + image)
    }

    console.log(currentPage)
    return (
        <Container textAlign="center">
            <Grid centered>
                <Grid.Column mobile={16} tablet={16} computer={16}>
                    <Grid.Row centered className={currentPage === 0 || currentPage === 7 ? "logo-image" : "intro-image"}>
                        <Image fluid src={getSRC(Intro[currentPage].image)} />
                    </Grid.Row>
                    <Grid.Row className="padded">
                        <Segment textAlign="center" className="description" inverted>
                            {Intro[currentPage].description}
                        
                        <Grid.Row textAlign="center">
                            {currentPage > 0 && currentPage < 7 ? <AnimatedIconButton inverted size="huge" color="olive" animated="vertical" floated="left" visiblecontent={"arrow left"} hiddencontent="Back" onClick={handlePrev} /> : null}
                            {currentPage < 7 ? <AnimatedIconButton inverted size="huge" color="olive" animated="vertical" floated="right" visiblecontent={"arrow right"} hiddencontent="Next" onClick={handleNext} /> : null}
                            <Segment fluid basic textAlign="center">
                                {currentPage === 7 ? <Button inverted color="olive" size="massive" onClick={enterSite}>Enter QUAN!</Button> : null}
                            </Segment>
                            {currentPage !== 7 ? <br/>: null}

                        </Grid.Row>
                        </Segment>
                    </Grid.Row>


                </Grid.Column>
            </Grid>
        </Container>
    )

}