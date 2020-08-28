import React, { useState } from 'react'
import { Menu, Segment, Image } from "semantic-ui-react"
import { Link } from "react-router-dom"
import "./style.css"
import { useInformationContext } from '../../pages/GatherInformation/utils/InformationState'
import { CLEAR_DATA } from "../../pages/GatherInformation/utils/action"



export default function NavMenu(props) {

    const [informationState, informationDispatch] = useInformationContext()

    const [active, setActive] = useState(null)

    const handleClick = (e, { name }) => {
        informationDispatch({ type: CLEAR_DATA })
        setActive(name)
    }

    return (
        <Segment inverted stretched padded className="nav-menu">
            <Menu vertical fluid inverted>
                <Menu.Item>
                    <h1 className="brand">QUAN</h1>
                    <h3 className="brand">Investing laid bear</h3>
                </Menu.Item>
                <Menu.Item>
                    <Image fluid src={require("../../assets/QUANlogo.png")} />
                </Menu.Item>
                <Link to="/">
                    <Menu.Item
                        onClick={() => setActive("Introduction")}
                        active={active === "Introduction"}
                    >
                        <Menu.Header className="enlarge">Introduction</Menu.Header>
                    </Menu.Item>
                </Link>


                <Menu.Item>
                    <Menu.Header className="enlarge">Beginner</Menu.Header>
                    <Menu.Menu>
                        <Link to="/basic">
                            <Menu.Item
                                className="larger"
                                name="Simple Investing"
                                active={active === "Simple Investing"}
                                onClick={handleClick}
                            />
                        </Link>
                        <Link to="/tax">
                            <Menu.Item
                                className="larger"
                                name="Tax Effect on Returns"
                                active={active === "Tax Effect on Returns"}
                                onClick={handleClick}
                            />
                        </Link>

                    </Menu.Menu>
                </Menu.Item>
                <Menu.Item>
                    <Menu.Header className="enlarge">Intermediate</Menu.Header>
                    <Menu.Menu>
                        <Link to="/monthly">
                            <Menu.Item
                                className="larger"
                                name="Investing Monthly"
                                active={active === "Investing Monthly"}
                                onClick={handleClick}
                            /></Link>


                    </Menu.Menu>
                </Menu.Item>
                <Menu.Item>
                    <Menu.Header className="enlarge">Advanced</Menu.Header>
                    <Menu.Menu>
                        <Link to="/active">
                            <Menu.Item
                                className="larger"
                                name="Active Trading"
                                active={active === "Active Trading"}
                                onClick={handleClick}
                            />
                        </Link>
                    </Menu.Menu>

                </Menu.Item>

            </Menu>
        </Segment>
    )
}