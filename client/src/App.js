import React, { useState, useEffect } from 'react';

import Sam from "./pages/Sam"
import Joel from "./pages/Joel"
import Volume from "./pages/Volume"
import Colin from './pages/Colin'
import Gabe from "./pages/Gabe"
import TaxEffect from "./pages/TaxExample"
// changed this because 2 imports titled "Loader"
// import ChartLoader from "./chartComponents/Loader"
import GatherInformation from "./pages/GatherInformation"
import Loader from "./components/Loader"
import "./App.css"
import 'semantic-ui-css/semantic.min.css'

function App() {

  return (
    <div>

    <GatherInformation pathname="/basic"/>
    {/* <Gabe/> */}
    {/* <Colin/> */}
    {/* <Sam/> */}
    {/* <Joel/> */}
    {/* <Volume/> */}

    {/* <TaxEffect/> */}
    {/* <SimpleInvestment/> */}


    {/* <Loader type={"bubbles"} className={"center-align"}/> */}
    </div>

  )
}

export default App;
