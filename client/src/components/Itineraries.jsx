import React, { Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

const Itinerary = (props) => {
    return (
        <div>
            <div>{props.itinerary.name}</div>
            <div>{props.itinerary.summary}</div>
            <Link to={`/itineraries/${props.userId}/itinerary/${props.itinerary.itinerary_id}`}><button>Go to</button></Link>
        </div>
    )
}

class Itineraries extends Component {
    constructor() {
        super();
        this.state = {
            itineraries: []
        }
    }

    componentDidMount() {
        const user_id = this.props.match.params.userId;
        axios.get(`http://localhost:3005/api/itinerary/all/${user_id}`)
            .then((res) => {
                this.setState({
                    itineraries: res.data.results
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        return (
            <div>
                <h1>Your Itineraries</h1>
                <Link to={`/itineraries/${this.props.match.params.userId}/createItinerary`}><button className="btn btn-primary">Create</button></Link>
                {this.state.itineraries.map((itinerary, i) => {
                    return(
                        <Itinerary userId={this.props.match.params.userId} itinerary={itinerary} key={i} />
                    )
                })}
            </div>
        )
    }
}

export default Itineraries;
