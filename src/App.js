import React, { Component } from 'react';
import './App.css';
import StarWars from './Component/StarWarsApi';

class App extends Component {
  render() {
    return (
      <div className="App">
        <StarWars/>
      </div>
    );
  }
}

export default App;
