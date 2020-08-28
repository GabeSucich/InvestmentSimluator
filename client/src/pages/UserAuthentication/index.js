import React, { useState } from 'react'
import { Link } from "react-router-dom"
import Login from "./Login"
import SignUp from "./SignUp"
import "./style.css"
import { Grid } from "semantic-ui-react"

export default function UserAuthentication(props) {

    const [page, setPage] = useState("login")
    const goToLogin = () => {
        setPage("login")
    }
    const goToSignUp = () => {
        setPage("signup")
    }

    return (
        <Grid centered>
            <Grid.Column mobile={16} tablet={10} computer={8}>
                {page === "login" ?
                    <Login changePage={goToSignUp} /> : <SignUp changePage={goToLogin} />
                }

            </Grid.Column>

        </Grid>

    )

}