import React, { Component } from 'react'
import axios from 'axios';
import SearchPlace from './SearchPlace';

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
        const itineraryId = this.props.match.params.itineraryId;
        console.log(itineraryId); 
        axios.delete(`http://localhost:3005/api/itinerary/${
            itineraryId}`)
            .then((res)=>{
                console.log(res);

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
                <button onClick = {this.handleDelete} className = "btn btn-primary"> Delete </button>
                <div>{this.state.itinerary.name}</div>
                <div>{this.state.itinerary.summary}</div>
                <div>{this.state.itinerary.date}</div>
                <div>{this.state.itinerary.budget}</div>
                <br />
                Places:
                {this.state.places.map((place, i) => {
                    return (
                        <div key={i}>
                            <div>{place.name}</div>
                            <div>{place.formatted_address}</div>
                            <br />
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default Itinerary;
