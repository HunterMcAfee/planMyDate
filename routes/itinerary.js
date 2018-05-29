var express = require('express');
var router = express.Router();
const mysql = require('mysql');
const creds = require('../config/creds');
const connection = mysql.createConnection(creds);
connection.connect();


/* GET home page. */

router.get('/:itineraryId', (req, res, next) => {
    const itinerary_id = req.params.itineraryId;
    const retrieveItinerary = `SELECT * FROM itineraries WHERE itinerary_id = ?`;
    connection.query(retrieveItinerary, [itinerary_id], (error, results) => {
        if (error) {
            throw error
        };
        res.json({
            results: results[0]
        })
    })
})

router.get('/all/:userId', (req, res, next) => {
    const user_id = req.params.userId;
    const retrieveAllItineraries = `SELECT * FROM itineraries WHERE user_id = ?`;
    connection.query(retrieveAllItineraries, [user_id], (error, results) => {
        if (error) {
            throw error
        };
        res.json({
            results
        })
    });
});

router.post('/', function (req, res, next) {
    const token = req.body.token;
    const retrieveUserID = `SELECT * FROM users WHERE token = ?`;
    const insertSQL = `INSERT INTO itineraries (name, date, summary, budget, user_id) VALUES (?, ?, ?, ?, ?)`;
    connection.query(retrieveUserID, [token], (error, results) => {
        if (error) {
            throw error
        };
        const user_id = results[0].user_id;
        const dataArray = [req.body.itineraryData.name, req.body.itineraryData.date, req.body.itineraryData.summary, req.body.itineraryData.budget, user_id]
        connection.query(insertSQL, dataArray, (error, results) => {
            if (error) {
                throw error
            };
            res.json({
                msg: "Successfully created itinerary"
            })
        })
    })
});

router.put('/:itineraryId', function (req, res, next) {
    const token = req.body.token;
    const itinerary_id = req.params.itineraryId;
    const updateSQL = `UPDATE itineraries SET name = ?, date = ?, summary = ?, budget = ? WHERE itinerary_id = ?`;
    const dataArray = [req.body.itineraryData.name, req.body.itineraryData.date, req.body.itineraryData.summary, req.body.itineraryData.budget, itinerary_id]
    connection.query(updateSQL, dataArray, (error, results) => {
        if (error) {
            throw error
        };
        res.json({
            msg: "Successfully updated itinerary"
        })
    })
});



module.exports = router;