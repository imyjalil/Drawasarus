import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import store from './Redux/store';
import Playground from './Playground';


ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div className="playGroundContainer">
        <Playground props={store} />
      </div>
    </Router>
  </Provider>
  ,
  document.getElementById('root')
);