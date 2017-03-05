import React, { Component } from 'react';
import './ProfileItem.css';

export default class ProfileItem extends Component {
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
