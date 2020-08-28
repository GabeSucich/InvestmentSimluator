import React, { Component } from 'react'
import { Accordion, Icon } from 'semantic-ui-react'

export default class ActionAccordion extends Component {
  state = { activeIndex: 0 }

  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({ activeIndex: newIndex })
  }

  render() {
    const { activeIndex } = this.state

    return (
      <Accordion>
        <Accordion.Title
          active={activeIndex === 0}
          index={0}
          onClick={this.handleClick}
        >
          <Icon name='dropdown' />
          Step 1 - Buy Low
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 0}>
          <p>
        This will be when the price of a stock dips down and you want to purchase. 
          </p>
        </Accordion.Content>

        <Accordion.Title
          active={activeIndex === 1}
          index={1}
          onClick={this.handleClick}
        >
          <Icon name='dropdown' />
          Step 2 - Buy High 
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 1}>
          <p>
            This is when you are looking to buy a stock and it begins to do very well, and you want to jump on the 
            positive trend without it running away without you. 
          </p>
        </Accordion.Content>

        <Accordion.Title
          active={activeIndex === 2}
          index={2}
          onClick={this.handleClick}
        >
          <Icon name='dropdown' />
          Step 3 - Sell Low
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 2}>
          <p>
            This is when your stock begins to dip and you want to sell before it falls too far.
          </p>
        </Accordion.Content>

        <Accordion.Title
          active={activeIndex === 3}
          index={3}
          onClick={this.handleClick}
        >
          <Icon name='dropdown' />
          Step 4 - Sell High
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 2}>
          <p>
            This is when your stock has done well, and you want to sell before it drops in price. 
          </p>
        </Accordion.Content>
      </Accordion>
    )
  }
}
