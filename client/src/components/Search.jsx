import React, { Component } from 'react'
import axios from 'axios';
import SearchPlace from './SearchPlace';

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
                <form onSubmit={this.handleSearch}>
                    <input type="text" placeholder="Type in your search terms here" name="searchTerm" />
                    <button className="btn btn-primary">Search</button>
                </form>
                {this.state.searchResults.map((result, i) => {
                    return (
                        <div key={i}>
                            <SearchPlace result={result} />
                            <button value={i} onClick={this.addPlace}>Add</button>
                            <hr />
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default Search;