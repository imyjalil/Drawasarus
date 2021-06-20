import './App.css';
import LandingPage from './components/landingPage';
import GamePage from './components/gamePage';
import { BrowserRouter, Route } from 'react-router-dom';
import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props)
    let state = {
    }
  }
  addPlayer = (clientId, name) => {
    this.setState({ clientId: { 'name': name, 'points': 0 } })
  }
  addPoints = (clientId, points) => {
    this.setState({ clientId: { 'points': this.state[clientId]['points'] + points } })
  }
  render() {

    return (
      <div className="App" >
        <BrowserRouter>

          <Route path="/" exact component={LandingPage} />
          <Route path="/game/" component={GamePage} />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
