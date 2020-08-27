import React, { useState } from 'react'
import { Menu, Segment, Rail } from "semantic-ui-react"
import "./style.css"
import { set } from 'mongoose'

export default function NavMenu(props) {

    console.log("Running")

    const [active, setActive] = useState(null)

    const handleClick = (e, { name }) => {
        setActive(name)
    }

    return (
        <Segment inverted stretched padded className="nav-menu">
            <Menu vertical fluid inverted>
                <Menu.Item
                onClick={() => setActive("Introduction")}
                active = {active === "Introduction"}
                >
                <Menu.Header className="enlarge">Introduction</Menu.Header>
                </Menu.Item>
                <Menu.Item>
                    <Menu.Header className="enlarge">Beginner</Menu.Header>
                    <Menu.Menu>
                        <Menu.Item
                            className="larger"
                            name="Simple Investing"
                            active={active === "Simple Investing"}
                            onClick={handleClick}
                        />
                        <Menu.Item
                            className="larger"
                            name="Tax Effect on Returns"
                            active={active === "Tax Effect on Returns"}
                            onClick={handleClick}
                        />
                    </Menu.Menu>
                </Menu.Item>
                <Menu.Item>
                    <Menu.Header className="enlarge">Intermediate</Menu.Header>
                    <Menu.Menu>
                        <Menu.Item
                            className="larger"
                            name="Investing Monthly"
                            active={active === "Investing Monthly"}
                            onClick={handleClick}
                        />
                    </Menu.Menu>
                </Menu.Item>
                <Menu.Item>
                    <Menu.Header className="enlarge">Advanced</Menu.Header>
                    <Menu.Menu>
                        <Menu.Item
                            className="larger"
                            name="Active Trading"
                            active={active === "Active Trading"}
                            onClick={handleClick}
                        />
                    </Menu.Menu>

                </Menu.Item>

            </Menu>
        </Segment>
    )
}