var express = require('express');
var router = express.Router();
const mysql = require('mysql');
const creds = require('../config/creds');
const connection = mysql.createConnection(creds);
connection.connect();
const axios = require('axios');
const bcrypt = require('bcrypt-nodejs'); 
const randToken = require('rand-token'); 

router.post('/login', (req,res)=>{
	console.log(req.body); 
	const email = req.body.email; 
	const password = req.body.password;  

	const selectUserQuery = `SELECT password FROM users WHERE email = ?`; 
	connection.query(selectUserQuery, [email], (error,results)=> {
		console.log(results[0].password); 

		if(error){throw error;}
		if(bcrypt.compareSync(password,results[0].password)) {
			res.json({
			msg:"We did it"
		})
	} else {
		res.json({
			msg: "It don't work"
		})
	}
	})
})

module.exports = router; 