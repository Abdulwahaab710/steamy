import React, { Component } from 'react';
import './Home.css';

import Logo from '../components/Logo.js';

export default class Home extends Component {
  render() {
    return (
      <div className='home-container'>
        <div className='home-inner'>
          <Logo logoFill='#616283' className='home-logo' />
          <h1 className='home-title centered'>Stop grinding your gears and find gamers you mesh with</h1>
          <form className='home-container'>
            <p className='home-subtitle centered'>- Step 1 -</p>
            <input className='home-input' type='text' placeholder='Enter your username' />
            <p className='home-subtitle centered'>- Step 2 -</p>
            <button className='home-input' type='submit'>Hookup</button>
          </form>
        </div>
      </div>
    );
  }
}
