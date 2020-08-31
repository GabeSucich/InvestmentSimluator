import { Bar } from 'react-chartjs-2';
import React, { useState } from "react"
import { StandardTable } from "../../../../SemanticUI/Tables"
import { Grid } from 'semantic-ui-react';
import { set } from 'mongoose';

export default function TaxBar(props) {

    const [loaded, setLoaded] = useState(false)
    const [currentData, setData] = useState({})
    const [tableBody, setTableBody] = useState([])

    if (!loaded) {

        setLoaded(true)

        const { simulations, labels, taxRates, options, ...otherAttributes } = props; // simulations is an array of objects, each object has a key of the simulation pointing to that simulation's data
        setData({
            labels: labels,
            datasets: [{
                data: simulations.map((simulation, index) => {
                    return (simulation.finalValue * (1 - .01 * taxRates[index])).toFixed()
                }),
                ...otherAttributes
            }]
        })

        const body = labels.map((label, index) => {
            const finalValue = (simulations[index].finalValue * (1 - .01 * taxRates[index])).toFixed(0)
            return [label, "$" + finalValue]
        })

        body.sort((a, b) => eval(b[1].slice(1)) - eval(a[1].slice(1)))

        setTableBody(body)

    }

    return (
        <Grid centered>
            <Grid.Column computer={10} tablet={10} mobile = {12} verticalAlign="middle">
                <Bar data={currentData} options={props.options ? props.options : {}} />
            </Grid.Column>
            <Grid.Column computer={6} tablet={6} mobile={12}>
                <StandardTable headers={["State", "Portfolio After Taxes"]} body={tableBody} textAlign="center" />
            </Grid.Column>
        </Grid>
    )
}