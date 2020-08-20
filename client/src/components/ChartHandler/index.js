import { Line } from 'react-chartjs-2';
import React from "react"

export default function ChartHandler(props) {
    const { simulations } = props; // simulations is an array of objects, each object has a key of the simulation pointing to that simulation's data
    const { labels } = props; // the names of the series to be charted
    if (typeof(props.options) === "undefined") {
        var options = {}
    } else {
        var { options } = props;
    }

    function processSimulation(i) {
        var simulation = simulations[i];
        var label = labels[i];
        var data = [];
        for (const dataPoint of simulation.portfolioHistory) {
            data.push(eval(dataPoint.totalValue))
        }
        return {"label": label, "data": data}
    }

    function processAllSimulations(simulations) {
        const datasets = [];
        for (var i in simulations) {
            var processedSimulation = processSimulation(i);
            datasets.push(processedSimulation);
        }
        return {"labels": processDates(simulations), "datasets": datasets}
    }

    function processDates(simulations) {
        var simulation = simulations[0];
        var dates = [];
        for (const data of simulation.portfolioHistory) {
            dates.push(data.date)
        }
        return dates;
    }

    return (
        <div className="container">
            <Line data={processAllSimulations(simulations)} options={options} />
        </div>
    )
}