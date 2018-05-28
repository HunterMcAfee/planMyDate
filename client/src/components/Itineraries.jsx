import React, { Component } from 'react'
import axios from 'axios';

const Itinerary = (props) => {
    return (
        <div>
            <div>{props.itinerary.name}</div>
            <div>{props.itinerary.summary}</div>
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
                {this.state.itineraries.map((itinerary, i) => {
                    return(
                        <Itinerary itinerary={itinerary} key={i} />
                    )
                })}
            </div>
        )
    }
}

export default Itineraries;
