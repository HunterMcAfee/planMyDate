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
                        <SearchPlace result={result} key={i} />
                    )
                })}
            </div>
        )
    }
}

export default Search;