import React, { useState } from 'react'
import API from "../../../utils/API"
import { useUserContent } from "../../../utils/UserState"
import { CREATE_NEW_USER } from "../../../utils/action"
import { Container, Segment, Form, Button, Message } from "semantic-ui-react"
import Logo from "../../../components/Logo"

export default function Signup({ changePage, ...props }) {

    const [userState, userDispatch] = useUserContent()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [invalidUsername, setInvalidUsername] = useState(false)
    const [invalidPassword, setInvalidPassword] = useState(false)
    const [loading, setLoading] = useState(false)

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
            setLoading(true)
            API.createUser(username, password).then(dbUser => {
                setLoading(false)
                if (!dbUser) {
                    setInvalidUsername(true)
                    setTimeout(() => {
                        setInvalidUsername(false)
                    }, 3000)
                    setUsername("")
                    setPassword("")
                }
                else {
                    userDispatch({ type: CREATE_NEW_USER, username: username })
                    setUsername("")
                    setPassword("")
                }
            })
        }

    }

    return (
        <Container textAlign="center" className="vertical-align">
            <Segment textAlign="center">
                <Logo/>
            </Segment>
            <Segment textAlign="center" inverted>
                {!loading ?
                    <Form inverted>
                        <Form.Input
                            className="form-input"
                            placeholder="Username"
                            value={username}
                            onChange={(e, { value }) => setUsername(value)}
                        />
                        <Form.Input
                            type="password"
                            className="form-input"
                            placeholder="Password"
                            value={password}
                            onChange={(e, { value }) => setPassword(value)}
                        />
                    </Form> :
                    <Form loading inverted>
                        <Form.Input
                            className="form-input"
                            placeholder="Username"
                            value={username}
                        />
                        <Form.Input
                            type="password"
                            className="form-input"
                            placeholder="Password"
                            value={password}
                        />
                    </Form>

                }
                <br></br>
                {invalidUsername ? <Message floating error>An account with this username already exists</Message> : null}
                {invalidPassword ? <Message floating error>Please enter a password of 8 or more characters</Message> : null}
                {username && password ? <Button inverted onClick={handleSubmit} color="olive" size="huge">Create Account</Button> : <Button onClick={handleSubmit} color="olive" size="huge" disabled inverted>Create Account</Button>}
                <br />
                <Button onClick={changePage} size="tiny" className="page-changer" inverted>Login</Button>
            </Segment>

        </Container>
    )

}