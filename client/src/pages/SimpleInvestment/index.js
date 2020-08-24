import React from 'react'
import API from "../../utils/API"
import { Form } from "semantic-ui-react"
import { useSimpleInvestmentContext } from "./utils/SimpleInvestmentState"


export default function SimpleInvestment() {

    const [state, dispatch] = useSimpleInvestmentContext()



    return (
        <Form loading>
            <Form.Input label='Email' placeholder='joe@schmoe.com' />
            <Button>Submit</Button>
        </Form>
    )

}