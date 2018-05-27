import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Search from './components/Search';
import CreateItinerary from './components/CreateItinerary';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/search" component={Search} />
          <Route exact path="/createItinerary" component={CreateItinerary} />
        </div>
      </Router>
    );
  }
}

export default App;
