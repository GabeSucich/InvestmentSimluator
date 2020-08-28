import React from 'react'
import { Button, Label, Icon } from "semantic-ui-react"

export function AnimatedButton(props) {

    const { animation, hiddencontent, visiblecontent, ...otherAttributes } = props


    if (!(animation === "fade" || animation === "vertical")) {
        return (
            <Button animated {...otherAttributes}>
                <Button.Content visible>{visiblecontent}</Button.Content>
                <Button.Content hidden>{hiddencontent}</Button.Content>
            </Button>
        )
    }

    else {
        return (
            <Button animated={animation} {...otherAttributes}>
                <Button.Content visible>{visiblecontent}</Button.Content>
                <Button.Content hidden>{hiddencontent}</Button.Content>
            </Button>
        )
    }
}

export function AnimatedIconButton(props) {

    const { animation, hiddencontent, visiblecontent, ...otherAttributes } = props


    if (!(animation === "fade" || animation === "vertical")) {
        return (
            <Button animated {...otherAttributes}>
                <Button.Content hidden>{hiddencontent}</Button.Content>
                <Button.Content visible>
                    <Icon name={visiblecontent} />
                </Button.Content>
            </Button>
        )
    }

    else {
        return (
            <Button animated={animation} {...otherAttributes}>
                <Button.Content hidden>{hiddencontent}</Button.Content>
                <Button.Content visible>
                    <Icon name={visiblecontent} />
                </Button.Content>
            </Button>
        )
    }
}

export function LabeledButton({ main, label, labelPosition, ...otherAttributes }) {


    return (
        <Button as='div' labelPosition={labelPosition} {...otherAttributes}>
            <Label as='a' basic>
                {main}
            </Label>
            <Button icon>
                {label}
            </Button>
        </Button>
    )

}