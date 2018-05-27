import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

class Login extends Component{
	constructor(){
		super();
		this.state = {
			loginData: []
		}
	}
	handleSubmit(event){
		event.preventDefault();
		const formValue = event.target;
		let formData = {
			email: formValue.email.value,
			password: formValue.password.value
		};
		axios.post('http://localhost:3005/userslogin/login', formData)
            .then((res) => {
                console.log(res.data)
            })
            .catch((error) => {
                console.log(error);
            })

	}

	render(){
		return (
			<form onSubmit = {this.handleSubmit}>
			<label> Email: </label>
			<input type = "email" name = "email"/>
			<br/>
			<label> Password: </label>
			<input type = "password" name = "password" />
			<br/>
			<button className = "btn btn-primary">Login</button>
			</form>
			)
	}
}

export default Login; 