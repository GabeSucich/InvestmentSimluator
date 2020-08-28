import React, { useState } from 'react'
import API from "../../../utils/API"
import { useUserContent } from "../../../utils/UserState"
import { LOGIN_USER } from "../../../utils/action"
import { Container, Segment, Form, Button, Message } from "semantic-ui-react"

export default function Login({changePage, ...props}) {

    const [userState, userDispatch] = useUserContent()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [invalidUsername, setInvalidUsername] = useState(false)
    const [invalidPassword, setInvalidPassword] = useState(false)

    const handleSubmit = () => {

        API.loginUser(username, password).then(username => {
            if (username === "NoUser") {
                setInvalidUsername(true)
                setTimeout(() => {
                    setInvalidUsername(false)
                }, 3000)
                setUsername("")
                setPassword("")
            }

            else if (username === "wrongPass") {
                setInvalidPassword(true)
                setTimeout(() => {
                    setInvalidPassword(false)
                }, 3000)
                setUsername("")
                setPassword("")
            }

            else {
                userDispatch({ type: LOGIN_USER, username: username })
                setUsername("")
                setPassword("")
            }

        })


    }

    return (
        <Container textAlign="center">
            <Segment textAlign="center">
                <Form>
                    <Form.Input
                        className="form-input"
                        placeholder="Username"
                        value={username}
                        onChange={(e, { value }) => setUsername(value)}
                    />
                    <Form.Input
                        className="form-input"
                        placeholder="Password"
                        value={password}
                        onChange={(e, { value }) => setPassword(value)}
                    />
                </Form>
            </Segment>
            {invalidUsername ? <Message floating error attached="bottom">This username does not match any existing credentials</Message> : null}
            {invalidPassword ? <Message floating error attached="bottom">Password does not match the credentials for this username</Message> : null}
            {username && password ? <Button onClick={handleSubmit} color="olive" size="huge">Login</Button> : <Button disabled color="olive" size="huge">Login</Button>}
            <br/>
            <Button size="tiny" onClick={changePage} className="page-changer">Create Account</Button>
            

        </Container>
    )

}
