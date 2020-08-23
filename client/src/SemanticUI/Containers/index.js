import React from 'react'
import {Container} from 'semantic-ui-react'

export function FluidContainer(props) {

    return (
        <Container fluid {...props}>{props.children}</Container>
    )
}

export function AlignedContainer({textAlign, ...props}) {

    return (
        <Container textAlign={textAlign} {...props}>{props.children}</Container>
    )
}