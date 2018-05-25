import React, { Component } from 'react'
import axios from 'axios';
import api_key from '../config/api_key';

class Search extends Component {
    constructor() {
        super();
        this.state = {
            searchData: []
        }
    }

    handleSearch(event) {
        event.preventDefault();
        const searchTerm = event.target[0].value;
        axios.post('http://localhost:3005/api/search', {
            "searchTerm": searchTerm
            })
            .then((res) => {
                console.log(res.data)
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
            </div>
        )
    }
}

export default Search;