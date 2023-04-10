const express = require('express');
const fs = require('fs');

const router = express.Router();
const JSON_FILE = 'json/product.json';

router.get('/list', (req, res) => {

    // Handle POST request for /users endpoint
    const data = JSON.parse(fs.readFileSync(JSON_FILE));

    // Return the response JSON data with the user ID
    const response_data = data.data;
    res.json({ status: 'success', data: response_data });
    console.log("/api/product/list called");
});


module.exports = router;