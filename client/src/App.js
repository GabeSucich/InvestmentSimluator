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
import { Container } from "semantic-ui-react"
import NavMenu from "./components/NavMenu"
import Navbar from "./components/Navbar"
import { Rail, Grid } from "semantic-ui-react"
import "./App.css"
import 'semantic-ui-css/semantic.min.css'

function App() {

  return (
    <div >
      <Grid only="mobile" >

        <Grid.Column width={16} only="mobile">
          <Navbar />
        </Grid.Column>
      </Grid>
      <Grid>
        <Grid.Row className="whole-view">
          <Grid.Column stretched tablet={5} computer={3} only="tablet computer" >
            {/* <Rail position="left"> */}
            <NavMenu />
            {/* </Rail> */}
          </Grid.Column>



          <Grid.Column stretched mobile={16} tablet={11} computer={13} className="display">
            <Container fluid>
              {/* <GatherInformation pathname="/tax" /> */}
              <Volume/>
            </Container>
          </Grid.Column>
        </Grid.Row>
        {/* {<Sam/>} */}
        
      </Grid>
    </div>
  )
}

export default App;
