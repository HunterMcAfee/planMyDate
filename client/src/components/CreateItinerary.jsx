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
                <div className="row">
                    <div className="col-sm-12 text-center">
                        <h4 className = "title" >Create An Itinerary</h4>
                        <br/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-3 text-center">
                        <Link to={`/itineraries/${this.props.match.params.userId}`}>
                            <button className="btn btn-primary">Go back</button>
                        </Link>
                    </div>
                    <div className="col-sm-6 form">
                        <form onSubmit={this.handleSubmit}>
                            <label>Itinerary Name:</label>
                            <br />
                            <input className="col-sm-12 box" type="text" name="name"></input>
                            <br />
                            <label>Itinerary Date:</label>
                            <br />
                            <input className="col-sm-12 box" type="date" name="date"></input>
                            <br />
                            <label>Itinerary Summary:</label>
                            <br />
                            <input className="col-sm-12 box" type="text" name="summary"></input>
                            <br />
                            <label>Itinerary Budget:</label>
                            <br />
                            <input className="col-sm-12 box" type="text" name="budget"></input>
                            <br />
                            <br />
                            <button style={{float: "right"}} className="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default CreateItinerary
