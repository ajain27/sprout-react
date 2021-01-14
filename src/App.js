import React, { Component } from 'react';
import './App.css';
import Twitterhandler from './components/Twitterhandler';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Twitterhandler/>
      </div>
    );
  }
}

export default App;
