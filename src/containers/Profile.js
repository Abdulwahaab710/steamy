import React, { Component } from 'react';
// import './Profile.css';
import ProfileSubHeader from '../components/ProfileSubHeader.js';
import ProfileItem  from '../components/ProfileItem.js';

export default class Profile extends Component {
  render() {
    return (
      <div>
        <ProfileSubHeader />
        <br />
        <ProfileItem />
      </div>
    );
  }
}
