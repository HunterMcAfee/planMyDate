var express = require('express');
var router = express.Router();
const mysql = require('mysql');
const creds = require('../config/creds');
const connection = mysql.createConnection(creds);
connection.connect();


/* GET home page. */
router.post('/', function(req, res, next) {
    const token = req.body.token;
    const retrieveUserID = `SELECT * FROM users WHERE token = ?`;
    const insertSQL = `INSERT INTO itineraries (name, date, summary, budget, user_id) VALUES (?, ?, ?, ?, ?)`;
    connection.query(retrieveUserID, [token], (error, results) => {
        if (error) {throw error};
        const user_id = results[0].user_id;
        const dataArray = [req.body.itineraryData.name, req.body.itineraryData.date, req.body.itineraryData.summary, req.body.itineraryData.budget, user_id]
        connection.query(insertSQL, dataArray, (error, results) => {
            if (error) {throw error};
            res.json({
                msg: "Successfully created itinerary"
            })
        })
    })
});

module.exports = router;