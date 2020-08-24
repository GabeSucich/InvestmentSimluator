import React from 'react'
import { Button } from "semantic-ui-react"

export function AnimatedButton(props) {

    var animation = props.animation
    const hiddenContent = props.hiddencontent
    const visiblecontent = props.visiblecontent

    if (!(animation === "fade" || animation === "vertical")) {
        return (
            <Button animated {...props}>
                <Button.Content visible>{visiblecontent}</Button.Content>
                <Button.Content hidden>{hiddenContent}</Button.Content>
            </Button>
        )
    }

    else {
        return (
            <Button animated={animation} {...props}>
                <Button.Content visible>{visiblecontent}</Button.Content>
                <Button.Content hidden>{hiddenContent}</Button.Content>
            </Button>
        )
    }
}