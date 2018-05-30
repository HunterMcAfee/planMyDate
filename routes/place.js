var express = require('express');
var router = express.Router();
const mysql = require('mysql');
const creds = require('../config/creds');
const connection = mysql.createConnection(creds);
connection.connect();

router.get('/:itineraryId', (req, res, next) => {
    const itinerary_id = req.params.itineraryId;
    const selectSQL = `SELECT * FROM places WHERE itinerary_id = ?`;
    connection.query(selectSQL, [itinerary_id], (error, results) => {
        // if (error) {
        //     throw error
        // }
        console.log(error);
        res.json({
            results
        })
    });
});

router.get('/id/:placeId', (req, res, next) => {
    const place_id = req.params.placeId;
    const selectSQL = `SELECT * FROM places WHERE place_id = ?`;
    connection.query(selectSQL, [place_id], (error, results) => {
        // if (error) {
        //     throw error
        // }
        console.log(error);
        res.json({
            results: results[0]
        })
    });
});

router.post('/', function (req, res, next) {
    const itinerary_id = req.body.itinerary_id;
    const insertSQL = `INSERT INTO places (place_id, itinerary_id, name, reference, location_lat, location_long, formatted_address, rating) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    const dataArray = [req.body.place_id, req.body.itinerary_id, req.body.name, req.body.reference, req.body.location_lat, req.body.location_long, req.body.formatted_address, req.body.rating];
    connection.query(insertSQL, dataArray, (error, results) => {
        // if (error) {
        //     throw error
        // };
        console.log(error);
        res.json({
            msg: "Successfully added place"
        })
    })

});

router.delete('/:itineraryId/:placeId', function(req, res, next ){
    const itinerary_id = req.params.itineraryId;
    const place_id = req.params.placeId;
    const deletePlace = `DELETE FROM places WHERE itinerary_id = ? and place_id = ?`
    const dataArray = [itinerary_id, place_id]; 
    connection.query(deletePlace, dataArray, (error,results)=>{
        // if(error){
        //     throw error
        // };
        console.log(error);
        res.json({
            msg: "Successfully deleted place from itinerary"
        })
    })
})
module.exports = router;