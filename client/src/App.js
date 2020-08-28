import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { UserProvider} from "./utils/UserState"
import UserConditional from "./pages/UserConditional"
import "./App.css"
import 'semantic-ui-css/semantic.min.css'

function App() {

  return (
    <Router>

      <UserProvider>
          <Switch>
            <Route exact path = "/basic">
                <UserConditional pathname = "/basic"/>
            </Route>
            <Route exact path = "/tax">
                <UserConditional pathname = "/tax"/>
            </Route>
            <Route exact path = "/monthly">
                <UserConditional pathname = "/monthly"/>
            </Route>
            <Route exact path = "/active">
                <UserConditional pathname = "/active"/>
            </Route>
            <Route>
                <UserConditional pathname = "/"/>
            </Route>
          </Switch>
      </UserProvider>
    </Router>
  )
}

export default App;
