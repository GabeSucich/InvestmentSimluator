import React, { useState } from 'react'
import API from "../../../utils/API"
import { useUserContent } from "../../../utils/UserState"
import { CREATE_NEW_USER } from "../../../utils/action"
import { Container, Segment, Form, Button, Message } from "semantic-ui-react"

export default function Signup({changePage, ...props}) {

    const [userState, userDispatch] = useUserContent()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [invalidUsername, setInvalidUsername] = useState(false)
    const [invalidPassword, setInvalidPassword] = useState(false)

    const handleSubmit = () => {

        if (password.length < 8) {
            setInvalidPassword(true)
            setTimeout(() => {
                setInvalidPassword(false)
            }, 3000)
            setUsername("")
            setPassword("")
        }
        else {
            API.createUser(username, password).then(dbUser => {
                if (!dbUser) {
                    setInvalidUsername(true)
                    setTimeout(() => {
                        setInvalidUsername(false)
                    }, 3000)
                    setUsername("")
                    setPassword("")
                }
                else {
                    userDispatch({type: CREATE_NEW_USER, username: username})
                    setUsername("")
                    setPassword("")
                }
            })
        }

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
            {invalidUsername ? <Message floating error>An account with this username already exists</Message> : null}
            {invalidPassword ? <Message floating error>Please enter a password of 8 or more characters</Message> : null}
            {username && password ? <Button onClick={handleSubmit} color="olive" size="huge">Create Account</Button> : <Button onClick={handleSubmit} color="olive" size="huge" disabled>Create Account</Button>}
            <br/>
            <Button onClick={changePage} size="tiny" className="page-changer">Login</Button>
            
        </Container>
    )

}