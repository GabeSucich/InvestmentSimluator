import React from 'react';
import TaxSimulationDisplay from "./components/TaxSimulationDisplay"
import {TaxEffextProvider} from "./utils/taxEffectState"
import RegionButtons from "./components/RegionButtons"


export default function TaxEffect() {

    return (
        <div>
            <TaxEffextProvider>
                <RegionButtons/>
                <TaxSimulationDisplay/>
            </TaxEffextProvider>
        </div>
    )

}