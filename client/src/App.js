import LandingPage from './components/LandingPage';
import GamePage from './components/gamePage';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      created: false
    }
  }

  componentDidMount() {
    console.log("componentDidMount")
  }

  componentDidUpdate() {
    console.log("componentDidUpdate")
  }

  render() {

    return (
      <div className="App" >
        <Switch>
          <Route path="/">
            <LandingPage />
          </Route>
          <Route path="/game/:code">
            <GamePage />
          </Route>
        </Switch>
      </div>
    )
  }
}



export default App;
