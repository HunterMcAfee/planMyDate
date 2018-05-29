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
                <button onClick = {this.handleDelete} className = "btn btn-primary"> Delete Itinerary </button>
                <div>{this.state.itinerary.name}</div>
                <div>{this.state.itinerary.summary}</div>
                <div>{this.state.itinerary.date}</div>
                <div>{this.state.itinerary.budget}</div>
                <br />
                <Link to={`/itineraries/${this.props.match.params.userId}/itinerary/${this.props.match.params.itineraryId}/search`}>
                    <button className="btn btn-primary">Add by search</button>
                </Link>
                <br />
                Places:
                {this.state.places.map((place, i) => {
                    return (
                        <div key={i}>
                            <Link to={`/itineraries/${this.props.match.params.userId}/itinerary/${this.props.match.params.itineraryId}/place/${place.place_id}`}>
                                <div>{place.name}</div>
                                <div>{place.formatted_address}</div>
                            </Link>
                            <button value ={i} onClick={this.handlePlaceDelete} className = "btn btn-primary">X</button>
                            <br />
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default Itinerary;
