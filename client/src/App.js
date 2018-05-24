import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Search from './components/Search';

class App extends Component {
  render() {
    return (
      <Router>
        <Route exact path="/search" component={Search} />
      </Router>
    );
  }
}

export default App;
