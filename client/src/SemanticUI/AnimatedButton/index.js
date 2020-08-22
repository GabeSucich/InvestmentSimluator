import React from 'react'
import { Button } from "semantic-ui-react"

export default function AnimatedButton(props) {

    var animation = props.animation
    const hiddenContent = props.hiddenContent
    const visibleContent = props.visibleContent

    if (!(animation === "fade" || animation === "vertical")) {
        return (
            <Button animated {...props}>
                <Button.Content visible>{visibleContent}</Button.Content>
                <Button.Content hidden>{hiddenContent}</Button.Content>
            </Button>
        )
    }

    else {
        return (
            <Button animated={animation} {...props}>
                <Button.Content visible>{visibleContent}</Button.Content>
                <Button.Content hidden>{hiddenContent}</Button.Content>
            </Button>
        )
    }


}