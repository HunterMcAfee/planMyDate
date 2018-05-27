var express = require('express');
var router = express.Router();
const mysql = require('mysql');
const creds = require('../config/creds');
const connection = mysql.createConnection(creds);
connection.connect();


/* GET home page. */
router.post('/', function(req, res, next) {
    const token = req.body.token;
    const retrieveUserID = `SELECT FROM users WHERE token = ?`;
    connection.query(retrieveUserID, [token], (error, results) => {
        const insertSQL = `INSERT INTO itineraries (name, date, summary, budget, user_id) VALUES ?, ?, ?, ?, ?`;
    })
});

module.exports = router;