import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './App.css';

import Intro from './Intro.js';
import EncountersList from './EncountersList.js';
import Story from './Story.js';

class App extends Component {

  render() {

    return (
      <Router>
        <div className='hello-stranger'>
          <div className='header'>
            <h4 id='hello'>HELLO</h4>
            <h5 id='stranger'>STRANGER</h5>
          </div>
          <Switch>
            <Route path="/intro">
              <Intro />
            </Route>
            <Route path="/story/:id">
              <Story />
            </Route>
            <Route path="/">
              <EncountersList />
            </Route>
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App;