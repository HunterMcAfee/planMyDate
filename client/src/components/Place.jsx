import React, { Component } from 'react';
import axios from 'axios';
import api_key from '../config/api_key';

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
                <iframe
                    width="600"
                    height="450"
                    frameBorder="0" style={{border: "0"}}
                    src={`https://www.google.com/maps/embed/v1/place?key=${api_key}
                        &q=place_id:${this.state.place.place_id}`} allowFullScreen>
                </iframe>
                
            </div>
        )
    }
}

export default Place;
