import React from 'react'
import { Route, Switch } from 'react-router-dom'
import GamePage from './Pages/GamePage/GamePage'
import LandingPage from './Pages/LandingPage/LandingPage'



function Playground(props) {

    return (
        <Switch>
            <Route exact path="/">
                <LandingPage props={props} />
            </Route>
            <Route path="/game/:code">
                <GamePage />
            </Route>
        </Switch>
    )
}

export default Playground
