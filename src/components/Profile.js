import React, { Component } from 'react';
import './Profile.css';

export default class Profile extends Component {
  render() {
    return (
      <div className="profile-container">
        <img src="https://github.com/josephroque.png" alt=""/>
        <div className="profile-info">
          <span>con</span>
          <br/>
          <span>Rust</span>
        </div>
          <span className="precentage">97%</span>
      </div>
    );
  }
}
