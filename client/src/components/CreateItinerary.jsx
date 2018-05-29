import React, { Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

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
                this.props.history.push(`/itineraries/${this.props.match.params.userId}`)
            })
            .catch((error) => {
                console.log(error);
            })
    }

    render() {
        return (
            <div>
                <Link to={`/itineraries/${this.props.match.params.userId}`}><button className="btn btn-primary">Go back</button></Link>
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
