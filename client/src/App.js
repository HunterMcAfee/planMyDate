import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Search from './components/Search';
import CreateItinerary from './components/CreateItinerary';
import Login from './components/Login'; 
import Register from './components/Register'; 

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/search" component={Search} />
          <Route exact path="/createItinerary" component={CreateItinerary} />
	        <Route exact path = "/login" component = {Login} />
	        <Route exact path = "/register" component = {Register} />
        </div>
      </Router>
    );
  }
}

export default App;
