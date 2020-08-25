import React from 'react'
import { Table } from "semantic-ui-react"

export function StandardTable(props) {

    const { headers, body, ...otherAttributes } = props

    return (
        <Table {...otherAttributes} celled>
            <Table.Header>
                <Table.Row>
                    {props.headers.map(headerName => <Table.HeaderCell>{headerName}</Table.HeaderCell>)}
                </Table.Row>
            </Table.Header>

            <Table.Body>
                {body.map(cellArr => {
                    return (
                        <Table.Row>
                            {cellArr.map(cell => <Table.Cell>{cell}</Table.Cell>)}
                        </Table.Row>
                    )
                })}
            </Table.Body>
        </Table>
    )

}
