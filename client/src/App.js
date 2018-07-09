import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';
import Search from './components/Search';
import CreateItinerary from './components/CreateItinerary';
import Login from './components/Login'; 
import Register from './components/Register'; 
import Itineraries from './components/Itineraries';
import Itinerary from './components/Itinerary';
import EditItinerary from './components/EditItinerary';
import Place from './components/Place';
import NavBar from './components/NavBar';
import Welcome from './components/Welcome';

class App extends Component {
    constructor() {
      super();
      this.state = {
          userId: ""
      }
  }

  componentDidMount() {
      axios.post('http://localhost:3005/userslogin/getUser', { token: localStorage.getItem("token")})
          .then((res) => {
              this.setState({
                  userId: res.data.results.user_id
              })
          })
          .catch((error) => {
              console.log(error);
          })
  }

  updateUser = () => {
    axios.post('http://localhost:3005/userslogin/getUser', { token: localStorage.getItem("token")})
          .then((res) => {
              this.setState({
                  userId: res.data.results.user_id
              })
          })
          .catch((error) => {
              console.log(error);
          })
  }

  render() {
    return (
      <Router>
        <div className="container">
          <Route path="/" component={() => {return (<NavBar userId={this.state.userId} />)}} />
          <Route exact path = "/" component = {Welcome}/>
          <Route exact path="/itineraries/:userId/itinerary/:itineraryId/search" component={Search} />
          <Route exact path="/itineraries/:userId/createItinerary" component={CreateItinerary} />
          <Route exact path="/editItinerary/:itineraryId" component={EditItinerary} />
          <Route exact path="/itineraries/:userId" component={Itineraries} />
          <Route exact path="/itineraries/:userId/itinerary/:itineraryId" component={Itinerary} />
          <Route exact path="/itineraries/:userId/itinerary/:itineraryId/place/:placeId" component={Place} />
	        <Route exact path="/login" component={(props) => { return(<Login history={props.history} updateUser={this.updateUser} />)}} />
	        <Route exact path="/register" component={(props) => { return(<Register history={props.history} updateUser={this.updateUser} />)}} />
        </div>
      </Router>
    );
  }
}

export default App;
