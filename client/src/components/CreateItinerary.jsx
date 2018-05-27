import React, { Component } from 'react'
import axios from 'axios';

class CreateItinerary extends Component {
    constructor() {
        super();
        this.setState = {
            name: "",
            date: "",
            summary: "",
            budget: ""
        }
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
        axios.post(`http://localhost:3005/api/itinerary`, {
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
                    <input type="text" name="name"></input>
                    <br />
                    <input type="date" name="date"></input>
                    <br />
                    <input type="text" name="summary"></input>
                    <br />
                    <input type="text" name="budget"></input>
                    <button className="btn btn-primary">Submit</button>
                </form>
            </div>
        )
    }
}

export default CreateItinerary
