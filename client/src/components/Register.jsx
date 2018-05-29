import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Register extends Component {
	constructor() {
		super();
		this.state = {
			registerData: []
		}
	}

	handleSubmit(event) {
		event.preventDefault();
		const formValue = event.target;
		let formData = {
			firstName: formValue.firstName.value,
			lastName: formValue.lastName.value,
			email: formValue.email.value,
			password: formValue.password.value
		};
		axios.post('http://localhost:3005/users/register', formData)
			.then((res) => {
				localStorage.setItem('token', res.data.token)
			})
			.catch((error) => {
				console.log(error);
			})
	}

	render() {
		return (
			<div>
				<div className = "col-md-12 text-center header">
					<h1> Register for Plan My Date</h1>
					<h4> Join users all over the world in planning a night out with a special loved one!</h4>
				</div>
				<div className = "col-md-6 col-md-offset-3 form">
					<form onSubmit={this.handleSubmit}>
						<label>First Name: </label>
						<br />
						<input className = "col-md-12 box" type="text" name="firstName" />
						<br />
						<label>Last Name: </label>
						<br />
						<input className = "col-md-12 box" type="text" name="lastName" />
						<br />
						<label>Email:</label>
						<br />
						<input className = "col-md-12 box" type="email" name="email" />
						<br />
						<label>Password: </label>
						<br />
						<input className = "col-md-12 box" type="password" name="password" />
						<br />
						<br />
						<p className = "col-md-12"> By clicking Register, I agree to the Terms of Service, Privacy Policy and Cookie Policy</p>
						<br />
						<button className="col-md-offset-10 btn btn-primary">Register</button>
					</form>
				</div>
			</div>
		)
	}
}

export default Register; 