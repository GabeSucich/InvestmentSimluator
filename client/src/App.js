import React, { useState, useEffect } from 'react';

import Sam from "./pages/Sam"
import Joel from "./pages/Joel"
import Colin from './pages/Colin'
import Gabe from "./pages/Gabe"
import TaxEffect from "./pages/TaxExample"
import SimpleInvestment from "./pages/SimpleInvestment"
import Loader from "./components/Loader"
import "./App.css"
import 'semantic-ui-css/semantic.min.css'

function App() {

  return (
    <div>
    {/* <Gabe/> */}
    {/* <Colin/> */}
    {/* <Sam/> */}

    {/* <TaxEffect/> */}
    <SimpleInvestment/>

    {/* <Loader type={"bubbles"} className={"center-align"}/> */}
    </div>

  )
}

export default App;
