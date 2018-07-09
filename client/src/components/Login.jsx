import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loginData: [],
			redirect: false,
			userId: ""
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
				localStorage.setItem('token', res.data.token)
				this.props.updateUser();
				this.props.history.push(`/itineraries/${res.data.user_id}`);
			})
			.catch((error) => {
				console.log(error);
			})
	}

	_redirect = (userId) => {
		console.log(userId)
		return (<Redirect to={`/itineraries/${userId}`} />)
	}

	render() {
		return (
			<div>
				<div className="col-md-12 text-center header">
					<h3> Scheduler </h3>
					<h4> Welcome Back. Please login below </h4>
				</div>
				<div className="col-md-8 col-md-offset-2 form">
					<form onSubmit={this.handleSubmit}>
						<label> Email: </label>
						<br />
						<input className="col-md-12 box" type="email" name="email" />
						<br />
						<label> Password: </label>
						<br />
						<input className="col-md-12 box" type="password" name="password" />
						<br />
						<br />
						<button style={{ float: "right" }} className="btn btn-primary">Login</button>
					</form>
				</div>
			</div>
		)

	}
}

export default Login; 