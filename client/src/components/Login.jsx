import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Login extends Component {
	constructor() {
		super();
		this.state = {
			loginData: []
		}
	}

	handleSubmit = (event) => {
		event.preventDefault();
		const formValue = event.target;
		let formData = {
			email: formValue.email.value,
			password: formValue.password.value
		};
		axios.post('http://localhost:3005/userslogin/login', formData)
			.then((res) => {
				console.log(res.data);
				localStorage.setItem('token', res.data.token)
				this.props.history.push(`/itineraries/${res.data.user_id}`);
			})
			.catch((error) => {
				console.log(error);
			})
	}

	render() {
		return (
			<div>
				<div className = "col-md-12 text-center header">
					<h1> Plan My Date </h1>
					<h4> Welcome Back, we've missed you &#x2764; Please login below </h4>
				</div>
				<div className = "col-md-6 col-md-offset-3 form">
					<form onSubmit={this.handleSubmit}>
						<label> Email: </label>
						<br />
						<input className = "col-md-12 box" type="email" name="email" />
						<br />
						<label> Password: </label>
						<br />
						<input className = "col-md-12 box" type="password" name="password" />
						<br />
						<br />
						<button style={{float: "right"}} className="btn btn-primary">Login</button>
					</form>
				</div>
			</div>
		)
	}
}

export default Login; 