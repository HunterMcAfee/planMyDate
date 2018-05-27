import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

class Register extends Component{
	constructor(){
		super();
		this.state = {
			registerData: []
		}
	}

	handleSubmit(event){
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
				localStorage.setItem('token',res.data.token)
            })
            .catch((error) => {
                console.log(error);
            })
	}

	render(){
		return (
			<form onSubmit = {this.handleSubmit}> 
			<label>First Name</label>
			<input type = "text" name = "firstName" />
			<br/>
			<label>Last Name</label>
			<input type = "text" name = "lastName" />
			<br/>
			<label>Email</label>
			<input type = "email" name = "email" />
			<br/>
			<label>Password</label>
			<input type = "password" name = "password" />
			<br/>
			<button className = "btn btn-primary">Register</button>
			</form>
			)
	}
}

export default Register; 