import React, { Component } from 'react'
import axios from 'axios';
import SearchPlace from './SearchPlace';
import { Link } from 'react-router-dom';

class Search extends Component {
    constructor() {
        super();
        this.state = {
            searchResults: []
        }
    }

    addPlace = (event) => {
        const placeData = this.state.searchResults[event.target.value];
        axios.post('http://localhost:3005/api/place', {
            formatted_address: placeData.formatted_address,
            name: placeData.name,
            place_id: placeData.place_id,
            rating: placeData.rating,
            reference: placeData.reference,
            location_lat: placeData.geometry.location.lat,
            location_long: placeData.geometry.location.lng,
            itinerary_id: this.props.match.params.itineraryId
        })
            .then((res) => {
                console.log(res);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    handleSearch = (event) => {
        event.preventDefault();
        const searchTerm = event.target[0].value;
        axios.post('http://localhost:3005/api/search', {
            "searchTerm": searchTerm
        })
            .then((res) => {
                console.log(res.data.results);
                this.setState({
                    searchResults: res.data.results
                })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-sm-12 text-center">
                        <h1> Search for a place to add to Itinerary below</h1>
                    </div>
                </div>

                    <div className = "col-md-6 col-md-offset-3 form">
                    <form onSubmit={this.handleSearch}>
                        <input className = "col-md-10 box" type="text" placeholder="Type in your search terms here" name="searchTerm" />
                        <button style={{float: "right"}} className="btn btn-primary">Search</button>
                    </form>
                    <br />
                    <br />
                    <div className = "row">
                        <div className = "col-sm-3">
                        <Link to={`/itineraries/${this.props.match.params.userId}/itinerary/${this.props.match.params.itineraryId}`}>
                            <button className="btn btn-primary">Done</button>
                        </Link>
                        </div>
                    </div>
                    </div>
                    {this.state.searchResults.map((result, i) => {
                        return (
                            <div className = "row col-sm-6 place-box" key={i}>
                                <div className = "col-md-3">
                                <SearchPlace result={result} />
                                <button className="btn btn-primary" value={i} onClick={this.addPlace}>Add</button>
                                <hr />
                            </div>
                        </div>
                        )

                
                })}
                    
            </div>
        )
    }
}

export default Search;