import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <h1>Stop grinding your gears and find gamers you mesh with</h1>
        <form>
          <p> - Step1 - </p>
          <input type="text" placeholder="Enter your username"/>
          <p> - Step2 - </p>
          <button type="submit">OK</button>
        </form>
      </div>
    );
  }
}

export default App;
