import React, { useState } from "react"
import { Accordion, Icon, Segment } from "semantic-ui-react"
import Instructions from "./Instructions.json"
import "./style.css"

export default function InstructionsAccordion({ pageName, ...props }) {

    console.log(pageName)
    const [isOpen, setIsOpen] = useState(true)

    const handleClick = (e, titleProps) => {
        isOpen ? setIsOpen(false) : setIsOpen(true)
    }


    return (
        <Segment inverted className="margin-above">
          <Accordion inverted fluid>
            <Accordion.Title
                className="title"
                active={isOpen}
                onClick={handleClick}
            >
            <Icon name='dropdown' />
          Instructions
        </Accordion.Title>
            <Accordion.Content active={isOpen}>
                <p className="instructions">
                    {Instructions[pageName]}
                </p>
            </Accordion.Content>

        </Accordion>  
        </Segment>
        

    )


}