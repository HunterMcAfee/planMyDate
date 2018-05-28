import React, { Component } from 'react'
import axios from 'axios';

class Itinerary extends Component {
    constructor() {
        super();
        this.state = {
            itinerary: []
        }
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
    }

    render() {
        return (
            <div>
                <div>{this.state.itinerary.name}</div>
                <div>{this.state.itinerary.summary}</div>
                <div>{this.state.itinerary.date}</div>
                <div>{this.state.itinerary.budget}</div>
            </div>
        )
    }
}

export default Itinerary;
