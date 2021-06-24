import './App.css';
import LandingPage from './components/landingPage';
import GamePage from './components/gamePage';
import { BrowserRouter, Route } from 'react-router-dom';
import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props)
    console.log("rendering app")
    this.state = {
      created: false
    }
  }

  componentDidMount()
  {
    console.log("app component did mount")
  }

  componentDidUpdate()
  {
    console.log("app did update")
  }

  addPlayer = (clientId, name) => {
    this.setState({ clientId: { 'name': name, 'points': 0 } })
    this.setState({ 'id':clientId})
  }
  addPoints = (clientId, points) => {
    this.setState({ clientId: { 'points': this.state[clientId]['points'] + points } })
  }
  updateCreated = () => {
    this.setState({ created: true })
  }

  updateGameId = (gameId) => {
    this.setState({gameId:gameId})
  }

  updateSocket = (socket) => {
    this.setState({ws:socket})
  }


  render() {

    return (
      <div className="App" >
        <BrowserRouter>
          <Route path="/" exact render={() => <LandingPage 
          addPlayer={this.addPlayer}
          addPoints={this.addPoints}
          updateCreated={this.updateCreated}
          updateGameId = {this.updateGameId}
          updateSocket = {this.updateSocket}
           />} />
          <Route path="/game/" render={() => <GamePage state={this.state} addPlayer={this.addPlayer} addPoints={this.addPoints} />} />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
