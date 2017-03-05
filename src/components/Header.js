import React, { Component } from 'react';
import './Header.css';

import Logo from './Logo.js';

export default class Header extends Component {
  render() {
    return (
      <header>
        <a href='/'>
          <Logo className="header-logo" />
        </a>
        <h1 className='header-title'>Steamy Hookups</h1>
      </header>
    );
  }
}
