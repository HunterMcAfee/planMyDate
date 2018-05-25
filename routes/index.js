var express = require('express');
var router = express.Router();
const mysql = require('mysql');
const creds = require('../config/creds');
const api_key = require('../config/api_key');
const connection = mysql.createConnection(creds);
connection.connect();
const axios = require('axios');

/* GET home page. */
router.post('/search', function(req, res, next) {
    const textSearch = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${req.body.searchTerm}&key=${api_key}`;
    axios.get(textSearch)
            .then((responseData) => {
                res.json(responseData.data);
            })
            .catch((error) => {
                res.json(error);
                console.log(error);
            })
});

module.exports = router;
