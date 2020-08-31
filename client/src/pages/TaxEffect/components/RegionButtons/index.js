import React from 'react'
import { AnimatedButton } from "../../../../SemanticUI/Buttons"
import taxRates from "../../utils/taxRates.json"
import { useTaxEffectContext } from "../../utils/taxEffectState"
import { SELECT_REGION } from "../../utils/action"
import { Grid } from "semantic-ui-react"
import "./style.css"

function RegionButton({ info }) {

    const region = info.region
    const taxRate = info.tax

    const [state, dispatch] = useTaxEffectContext()

    function formatTaxRate(taxRate) {
        var stringTax = String(taxRate)
        const decimalIndex = stringTax.indexOf(".")
        if (decimalIndex === -1) {
            stringTax += ".00"
        }
        else if (stringTax.slice(decimalIndex + 1).length === 1) {
            stringTax += "0"
        }

        return stringTax
    }


    return (

        <AnimatedButton className={state.currentRegions.includes(info) ? "selected" : ""} onClick={() => dispatch({ type: SELECT_REGION, region: info })} animation="fade" hiddencontent={formatTaxRate(taxRate) + "%"} visiblecontent={region} />
    )
}

export default function RegionButtonDiv() {

    return (
        <Grid centered>
            <Grid.Row textAlign="center">
                {taxRates.map((info, index) => {
                    return (
                        <RegionButton key={index} info={info} className="region" />
                    )
                })}
            </Grid.Row>
        </Grid>
    )

}