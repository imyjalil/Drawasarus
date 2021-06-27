import React from 'react'
import { Route, Switch } from 'react-router-dom'
import GamePage from './Pages/GamePage/GamePage'
import LandingPage from './Pages/LandingPage/LandingPage'



function Playground() {

    return (
        <Switch>
            <Route exact path="/">
                <LandingPage />
            </Route>
            <Route path="/game/:code">
                <GamePage />
            </Route>
        </Switch>
    )
}

export default Playground
