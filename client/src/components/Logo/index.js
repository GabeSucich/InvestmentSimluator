import React from "react"
import {Segment, Image, Container} from "semantic-ui-react"

export default function Logo() {

    return (
        <Segment fluid textAlign="center">
            <Image src={require("../../assets/QUANlogo.png")}/>
            <Segment basic textAlign="center">
                <h1>QUAN</h1>
                <h3> Investing Laid Bear</h3>
               
            </Segment>
        </Segment>

    )

}