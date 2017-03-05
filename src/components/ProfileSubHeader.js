import React, { Component } from 'react';
import './ProfileSubHeader.css';

export default class ProfileSubHeader extends Component {
  render() {
    return (
      <div className="profile-container">
        <img src="https://github.com/josephroque.png" alt=""/>
        <div className="profile-info">
          <span className="username">con</span>
          <table>
            <thead>
              <th>My top games</th>
              <th></th>
              <th>My top tags</th>
            </thead>
            <tbody>
              <tr>
                <td>Stardew Valley</td>
                <td>13 hours</td>
                <td>#adventure</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
