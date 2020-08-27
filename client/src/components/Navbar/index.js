import React, { useState } from 'react'
import { Menu, Segment, Modal } from "semantic-ui-react"
import "./style.css"

export default function Navbar(props) {

    const [active, setActive] = useState()

    const handleClick = (e, { name }) => {
        setActive(name)
    }

    return (
        <Segment inverted fluid>
            <Menu fluid inverted>
                <Menu.Item
                    name="Introduction"
                    onClick={handleClick}
                    active={active === "Introduction"}
                />
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
                                <Menu.Item
                                    className="larger"
                                    name="Simple Investing"
                                    active={active === "Introduction"}
                                    onClick={handleClick}
                                />
                                <Menu.Item
                                    className="larger"
                                    name="Tax Effect on Returns"
                                    active={active === "Introduction"}
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
                                    active={active === "Introduction"}
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
                                    active={active === "Introduction"}
                                    onClick={handleClick}
                                />
                            </Menu.Menu>

                        </Menu.Item>

                    </Menu>
                </Segment>
            </Modal.Content>
        </Modal>
    )

}
