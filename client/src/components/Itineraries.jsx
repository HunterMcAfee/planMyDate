import React, { Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

const Itinerary = (props) => {
    return (
        <div className="row itinerary-box">
            <div className="col-sm-2">
                <label> Name: </label>
                <br />
                {props.itinerary.name}
            </div>
            <div className="col-sm-3 word-wrap">
                <label> Summary: </label>
                <br />
                {props.itinerary.summary}
            </div>
            <div className="col-sm-2 word-wrap">
                <label> Date: </label>
                <br />
                {props.itinerary.date}
            </div>
            <div className="col-sm-2 word-wrap">
                <label> Timeframe: </label>
                <br />
                {props.itinerary.budget}
            </div>
            
            <div className="col-sm-3 text-center">
                <Link to={`/itineraries/${props.userId}/itinerary/${props.itinerary.itinerary_id}`}><button className="btn btn-primary" style={{ float: "right" }}>Go to</button></Link>
            </div>
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
            <div className="container">
                <div className="col-md-12 text-center header">
                    <h1>Your Itineraries</h1>
                    <br/>
                </div>
                <div className="row">
                    <div className="col-md-12 text-center form">
                        <Link to={`/itineraries/${this.props.match.params.userId}/createItinerary`}>
                            <button className="btn btn-unique">Create New Itinerary</button>
                        </Link>
                    </div>
                </div>
                {this.state.itineraries.map((itinerary, i) => {
                    return (
                        <Itinerary userId={this.props.match.params.userId} itinerary={itinerary} key={i} />
                    )
                })}
            </div>
        )
    }
}

export default Itineraries;
