import React, { useState } from 'react'
import {Link} from "react-router-dom"
import { Menu, Segment, Modal, Image } from "semantic-ui-react"
import {useInformationContext} from "../../pages/GatherInformation/utils/InformationState"
import {CLEAR_DATA} from "../../pages/GatherInformation/utils/action"
import "./style.css"
import { useUserContent } from '../../utils/UserState'

export default function Navbar(props) {

    const [active, setActive] = useState()
    const [userState, userDispatch] = useInformationContext()

    const handleClick = (e, { name }) => {
        setActive(name)
        userDispatch({type: CLEAR_DATA})
    }

    return (
        <Segment inverted fluid>
            <Menu fluid inverted>
                <Menu.Item>
                    <h1>QUAN</h1>
                </Menu.Item>
        
                   <Menu.Item

                    onClick={handleClick}
                    active={active === "Introduction"}
                >
                <Link to="/">
                    Introduction
                </Link>
                </Menu.Item> 
                
                
                <InvestmentModal />
            </Menu>
        </Segment>
    )
}

function InvestmentModal(props) {

    const [open, setOpen] = useState(false)
    const [active, setActive] = useState()

    const handleClick = (e, { name }) => {
        setActive(name)
        setOpen(false)
    }

    return (
        <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={<Menu.Item name="Explore Investing" />}
        >
            <Modal.Header>Choose an Investment Tier</Modal.Header>
            <Modal.Content>
                <Segment inverted padded>
                    <Menu vertical fluid inverted>
                        <Menu.Item>
                            <Menu.Header className="enlarge">Beginner</Menu.Header>
                            <Menu.Menu>
                                <Link to="basic">
                                    <Menu.Item
                                    className="larger"
                                    name="Simple Investing"
                                    active={active === "Introduction"}
                                    onClick={handleClick}
                                />
                                </Link>
                                <Link to="/tax">
                                    <Menu.Item
                                    className="larger"
                                    name="Tax Effect on Returns"
                                    active={active === "Introduction"}
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
                                    active={active === "Introduction"}
                                    onClick={handleClick}
                                />
                                </Link>
                                
                            </Menu.Menu>
                        </Menu.Item>
                        <Menu.Item>
                            <Menu.Header className="enlarge">Advanced</Menu.Header>
                            <Menu.Menu>
                                <Link to="/active">
                                    <Menu.Item
                                    className="larger"
                                    name="Active Trading"
                                    active={active === "Introduction"}
                                    onClick={handleClick}
                                />
                                </Link>

                                
                            </Menu.Menu>

                        </Menu.Item>

                    </Menu>
                </Segment>
            </Modal.Content>
        </Modal>
    )

}
