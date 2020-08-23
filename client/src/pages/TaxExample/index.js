import React from 'react';
import TaxSimulationDisplay from "./components/TaxSimulationDisplay"
import { TaxEffextProvider } from "./utils/taxEffectState"
import RegionButtons from "./components/RegionButtons"
import { AlignedContainer } from "../../SemanticUI/Containers"

export default function TaxEffect() {

    return (
        <div>
            <TaxEffextProvider>
                <AlignedContainer textAlign="justified">
                    <RegionButtons />
                    <TaxSimulationDisplay />
                </AlignedContainer>
            </TaxEffextProvider>
        </div>
    )

}