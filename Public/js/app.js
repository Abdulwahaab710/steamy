import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
  render() {
    return (
      <form action="http://localhost:3000/userLastPlayed/">
        <input id="username" type="text" name="username"/>
        <button type="submit">GO</button>
      </form>
    );
  }
}

const app = document.getElementById('app')
ReactDOM.render(<Form />, document.getElementById('app'));
