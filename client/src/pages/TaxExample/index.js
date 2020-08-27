// import React from 'react';
// import TaxSimulationDisplay from "./components/TaxSimulationDisplay"
// import { TaxEffextProvider } from "./utils/taxEffectState"
// import RegionButtons from "./components/RegionButtons"
// import { AlignedContainer } from "../../SemanticUI/Containers"
// import { useSimpleInvestmentContext } from "../GatherInformation/utils/InformationState"

// export default function TaxEffect() {

//     const [state, dispatch] = useSimpleInvestmentContext()

//     if (state.informationGathered) {

//         return (
//             <div>
//                 <TaxEffextProvider>
//                     <AlignedContainer textAlign="center">
//                         <RegionButtons />
//                         <TaxSimulationDisplay />
//                     </AlignedContainer>
//                 </TaxEffextProvider>
//             </div>
//         )

//     }

//     else {
//         return null
//     }



// }