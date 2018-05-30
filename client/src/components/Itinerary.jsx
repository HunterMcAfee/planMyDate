import React, { Component } from 'react'
import axios from 'axios';
import SearchPlace from './SearchPlace';
import { Link } from 'react-router-dom';

class Itinerary extends Component {
    constructor() {
        super();
        this.state = {
            itinerary: [],
            places: []
        }
    }
    handleDelete = (event) => {
        event.preventDefault(); 
        const itinerary_id = this.props.match.params.itineraryId;
        console.log(itinerary_id); 
        axios.delete(`http://localhost:3005/api/itinerary/${
            itinerary_id}`)
            .then((res)=>{
                console.log(res);
                this.props.history.push(`/itineraries/${this.props.match.params.userId}`);
            })
            .catch((error)=>{
                console.log(error);
            })

        }

    handlePlaceDelete = (event)=>{
        event.preventDefault();
        const itinerary_id = this.props.match.params.itineraryId;
        const place_id = this.state.places[event.target.value].place_id; 
        console.log(itinerary_id);
        console.log(place_id);
        axios.delete(`http://localhost:3005/api/place/${
            itinerary_id}/${place_id}`)
        .then((res)=>{
            console.log(res); 
            axios.get(`http://localhost:3005/api/place/${itinerary_id}`)
            .then((res) => {
                this.setState({
                    places: res.data.results
                });
            })
            .catch((error) => {
                console.log(error);
            });
        })
        .catch((error)=>{
            console.log(error); 
        })
    
    }

    componentDidMount() {
        const itinerary_id = this.props.match.params.itineraryId;
        axios.get(`http://localhost:3005/api/itinerary/${itinerary_id}`)
            .then((res) => {
                this.setState({
                    itinerary: res.data.results
                });
            })
            .catch((error) => {
                console.log(error);
            });

        axios.get(`http://localhost:3005/api/place/${itinerary_id}`)
            .then((res) => {
                this.setState({
                    places: res.data.results
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-sm-12 text-center">
                        <h1 className="title">Itinerary Name: {this.state.itinerary.name}</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-3">
                        <Link to={`/itineraries/${this.props.match.params.userId}`}>
                            <button className="btn btn-primary">Go back</button>
                        </Link>
                    </div>
                    <div className="col-sm-offset-3 col-sm-3">
                        <Link to={`/itineraries/${this.props.match.params.userId}/itinerary/${this.props.match.params.itineraryId}/search`}>
                            <button className="btn btn-primary">Add Places by Search</button>
                        </Link>
                    </div>
                </div>

                <div className="row" style={{paddingTop: "20px"}}>
                    <div className="col-sm-6">
                        <div className="form text-center word-wrap">
                            <h3>Summary: {this.state.itinerary.summary}</h3>
                            <h3>Date: {this.state.itinerary.date}</h3>
                            <h3>Budget: {this.state.itinerary.budget}</h3>
                        </div>
                        <button onClick={this.handleDelete} className="btn btn-primary" style={{marginTop: "20px"}}> Delete Itinerary </button>
                    </div>

                    <div className="col-sm-6">
                        <h3>Places:</h3>
                        {this.state.places.map((place, i) => {
                            return (
                                <div className="place-box" key={i}>
                                    <button style={{float: "right"}} value={i} onClick={this.handlePlaceDelete} className = "btn btn-primary">X</button>
                                    <Link to={`/itineraries/${this.props.match.params.userId}/itinerary/${this.props.match.params.itineraryId}/place/${place.place_id}`}>
                                        <div>{place.name}</div>
                                        <div>{place.formatted_address}</div>
                                    </Link>
                                    <br />
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }
}

export default Itinerary;
