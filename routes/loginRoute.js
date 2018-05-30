var express = require('express');
var router = express.Router();
const mysql = require('mysql');
const creds = require('../config/creds');
const connection = mysql.createConnection(creds);
connection.connect();
const axios = require('axios');
const bcrypt = require('bcrypt-nodejs');
const randToken = require('rand-token');

router.post('/login', (req, res) => {
	console.log(req.body);
	const email = req.body.email;
	const password = req.body.password;
	const selectUserQuery = `SELECT * FROM users WHERE email = ?`;
	connection.query(selectUserQuery, [email], (error, results) => {
		// if (error) {
		// 	throw error;
		// }
		console.log(error);
		if (bcrypt.compareSync(password, results[0].password)) {
			const user_id = results[0].user_id;
			const token = randToken.uid(100);
			const updateUserQuery = `UPDATE users SET token = ? WHERE user_id = ?`;
			connection.query(updateUserQuery, [token, user_id], (error, results) => {
				// if (error) {
				// 	throw error
				// };
				console.log(error);
				res.json({
					token,
					user_id,
					msg: "User successfully logged in"
				});
			});
		} else {
			res.json({
				msg: "User credentials invalid"
			});
		}
	})
});

module.exports = router;