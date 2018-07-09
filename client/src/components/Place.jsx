import React, { Component } from 'react';
import axios from 'axios';
import api_key from '../config/api_key';
import { Link } from 'react-router-dom';

class Place extends Component {
    constructor() {
        super();
        this.state = {
            place: {}
        }
    }

    componentDidMount() {
        const place_id = this.props.match.params.placeId;
        axios.get(`http://localhost:3005/api/place/id/${place_id}`)
            .then((res) => {
                this.setState({
                    place: res.data.results
                })
                console.log(this.state);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    render() {
        return (
            <div>
                <div style={{marginBottom: "10px"}} className="row text-center">
                    <Link to={`/itineraries/${this.props.match.params.userId}/itinerary/${this.props.match.params.itineraryId}`}><button className="btn btn-primary">Go back</button></Link>
                </div>
                <div className="row text-center">
                    <iframe
                        width={`${document.documentElement.clientWidth * 0.75}px`}
                        height={`${document.documentElement.clientHeight * 0.75}px`}
                        frameBorder="0" style={{border: "0"}}
                        src={`https://www.google.com/maps/embed/v1/place?key=${api_key}
                            &q=place_id:${this.state.place.place_id}`} allowFullScreen>
                    </iframe>
                </div>
            </div>
        )
    }
}

export default Place;
