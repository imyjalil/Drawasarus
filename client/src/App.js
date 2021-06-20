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

          <Route path="/" exact render={() => <LandingPage addPlayer={this.addPlayer} addPoints={this.addPoints} />} />
          <Route path="/game/" render={() => <GamePage state={this.state} addPlayer={this.addPlayer} addPoints={this.points} />} />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
