import React, { Component } from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router'
import './App.css';

import Header from '../components/Header.js';
import Home from './Home.js';
import Profile from '../containers/Profile.js';

const Container = (props) => (
  <div className='content'>
    <Header />
    {props.children}
  </div>
);

export default class App extends Component {
  render() {
    return (
      <div>
        <Router history={hashHistory}>
          <Route path='/' component={Container}>
            <IndexRoute component={Home} />
          </Route>
          <Route path='/profile' component={Container}>
            <IndexRoute component={Profile} />
          </Route>
        </Router>
      </div>
    );
  }
}
