var express = require('express');
var router = express.Router();
const mysql = require('mysql');
const creds = require('../config/creds');
const connection = mysql.createConnection(creds);
connection.connect();
const axios = require('axios');
const bcrypt = require('bcrypt-nodejs');
const randToken = require('rand-token');

/* GET home page. */
router.post('/register', (req, res) => {
	const firstName = req.body.firstName;
	const lastName = req.body.lastName;
	const email = req.body.email;
	const password = req.body.password;
	const hashedPassword = bcrypt.hashSync(password);
	const token = randToken.uid(100);
	const insertUserQuery = `INSERT into users 
	(first_name, last_name, email, password, token)
		VALUES
	(?, ?, ?, ?, ?)`;
	connection.query(insertUserQuery, [firstName, lastName, email, hashedPassword, token],
		(error, results) => {
			if (error) {throw error;}
			res.json({
				token,
				msg: "registerSuccess"
			})
		})
});

module.exports = router;
