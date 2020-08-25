import React, { useState, useEffect } from 'react';

import Sam from "./pages/Sam"
import Joel from "./pages/Joel"
import Volume from "./pages/Volume"
import Colin from './pages/Colin'
import Gabe from "./pages/Gabe"
import TaxEffect from "./pages/TaxExample"
<<<<<<< HEAD
import Loader from "./chartComponents/Loader"
=======
import SimpleInvestment from "./pages/SimpleInvestment"
import Loader from "./components/Loader"
>>>>>>> master
import "./App.css"
import 'semantic-ui-css/semantic.min.css'

function App() {

  return (
    <div>
    {/* <Gabe/> */}
<<<<<<< HEAD
    <Colin/>,
    {/* <Sam/> */},

    {/* <TaxEffect/> */},
=======
    {/* <Colin/> */}
    {/* <Sam/> */}
    {/* <Joel/> */}
    <Volume/>

    {/* <TaxEffect/> */}
    {/* <SimpleInvestment/> */}
>>>>>>> master

    {/* <Loader type={"bubbles"} className={"center-align"}/> */}
    </div>

  )
}

export default App;
