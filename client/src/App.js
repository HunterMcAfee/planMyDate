import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Search from './components/Search';
import CreateItinerary from './components/CreateItinerary';
import Login from './components/Login'; 
import Register from './components/Register'; 
import Itineraries from './components/Itineraries';
import Itinerary from './components/Itinerary';
import EditItinerary from './components/EditItinerary';
import Place from './components/Place';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/itineraries/:userId/itinerary/:itineraryId/search" component={Search} />
          <Route exact path="/itineraries/:userId/createItinerary" component={CreateItinerary} />
          <Route exact path="/editItinerary/:itineraryId" component={EditItinerary} />
          <Route exact path="/itineraries/:userId" component={Itineraries} />
          <Route exact path="/itineraries/:userId/itinerary/:itineraryId" component={Itinerary} />
          <Route exact path="/itineraries/:userId/itinerary/:itineraryId/place/:placeId" component={Place} />
	        <Route exact path="/login" component={Login} />
	        <Route exact path="/register" component={Register} />
        </div>
      </Router>
    );
  }
}

export default App;
