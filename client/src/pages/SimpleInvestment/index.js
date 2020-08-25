import React from 'react'
import API from "../../utils/API"

export default function SimpleInvestment() {

    API.validateStockData('GUSH').then(isValid => {
        if (isValid) {
            console.log("valid")
        }
        else {
            console.log("Invalid")
        }

    })
    return (
        <div>Test</div>
    )

}