import React, { Component } from 'react';
import axios from 'axios';

class EditItinerary extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            summary: '',
            budget: '',
            date: ''
        }
    }
    componentDidMount() {
        const itineraryId = this.props.match.params.itineraryId;
        console.log(itineraryId);
        axios.get(`http://localhost:3005/api/itinerary/${itineraryId}`)
            .then((res) => {
                console.log(res);
                this.setState({
                    name: res.data.results.name,
                    summary: res.data.results.summary,
                    budget: res.data.results.budget,
                    date: res.data.results.date
                })
                console.log(this.state);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    handleChange = (event) => {
        const attributeName = event.target.name;
        const attributeValue = event.target.value;
        const newState = {...this.state};
        newState[attributeName] = attributeValue;
        this.setState(newState);
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const formValue = event.target;
        const itineraryData = {
            name: formValue.name.value,
            date: formValue.date.value,
            summary: formValue.summary.value,
            budget: formValue.budget.value
        }
        const token = localStorage.getItem("token");
        const itineraryId = this.props.match.params.itineraryId;
        axios.put(`http://localhost:3005/api/itinerary/${itineraryId}`, {
            itineraryData,
            token
        })
            .then((responseData) => {
                console.log(responseData);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    render() {
        return (

            <div>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" name="name" onChange={this.handleChange} value={this.state.name}></input>
                    <br />
                    <input type="date" name="date" onChange={this.handleChange} value={this.state.date}></input>
                    <br />
                    <input type="text" name="summary" onChange={this.handleChange} value={this.state.summary}></input>
                    <br />
                    <input type="text" name="budget" onChange={this.handleChange} value={this.state.budget}></input>
                    <button className="btn btn-primary">Submit</button>
                </form>
            </div>
        )
    }
}

export default EditItinerary;