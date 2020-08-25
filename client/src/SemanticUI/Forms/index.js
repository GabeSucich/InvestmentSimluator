import React from 'react'
import {Form} from 'semantic-ui-react'

export function StandardForm(props) {
    
    return (
        <Form {...props}>
            {props.children}
        </Form>
    )
}


export function  LoadingForm(props) {

    return (
        <Form loading {...props}>
            {props.children}
        </Form>
    )
}