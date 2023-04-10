const express = require('express');
const fs = require('fs');
const { last } = require('lodash');

const router = express.Router();
const JSON_FILE = 'json/user.json';


router.post('/signUp', (req, res) => {

    // Handle POST request for /users endpoint
    const data = JSON.parse(fs.readFileSync(JSON_FILE));

    // Get the request JSON data
    const { firstName, lastName, email, phoneNumber, password } = req.body;

    // Check if user already exists
    var userExists = false;
    Object.keys(data.users).forEach((v, i, a) => {
        var u = data.users[v];
        if (u.email == email) {
            userExists = true;
            return;
        }
    })

    if (userExists) {
        return res.json({ status: 'fail', data: 'User already exists' });
        console.log('url: /api/account/signUp, Fail: User already exists');
    }

    // Add the new user to the data
    var newUserId = Object.keys(data.users).length + 1;
    var token = Math.floor(Math.random() * 999999) + 100000;
    const newUser = {
        id: newUserId,
        email,
        firstName,
        lastName,
        phoneNumber,
        password,
        token: token,
        payment:{
            cardnum:"",
            holder:"",
            expiry:"",
            type:"",
            cvv:""
        },
        address:""
    };

    data.users[newUserId] = newUser;

    // Save the updated data to the JSON file
    fs.writeFileSync(JSON_FILE, JSON.stringify(data));

    // Return the response JSON data
    const response_data = { userId: newUserId, token, token };
    res.json({ status: 'success', data: response_data });
    console.log('url: /api/account/signUp, Success called');
});

router.post('/signIn', (req, res) => {

    // Get the request JSON data
    const { email, password } = req.body;
    console.log("login email: " + email);
    console.log("login pw: " + password);

    // Handle POST request for /users endpoint
    const data = JSON.parse(fs.readFileSync(JSON_FILE));

    // Find the user with the provided phone and password
    var user = null;
    var token = null;
    Object.keys(data.users).forEach((v, i, a) => {
        var u = data.users[v];
        if (u.email == email && u.password == password) {
            user = u;
            return;
        }
    })

    if (!user) {
        return res.json({ status: 'fail', data: 'Invalid email or password' });
    }
    else {
        token = Math.floor(Math.random() * 999999) + 100000;
        data.users[user.id].token = token;
        fs.writeFileSync(JSON_FILE, JSON.stringify(data));
    }

    // Return the response JSON data with the user ID
    const response_data = { userId: user.id, token: token };
    console.log("loging")
    console.log(response_data)
    res.json({ status: 'success', data: response_data });
    console.log('url: /api/account/signIn, Success called');
});

router.post('/auth', (req, res) => {
    console.log('req: /api/account/auth');
    const token = req.headers["hbtoken"]
    console.log("token: " + token);

    // Handle POST request for /users endpoint
    const data = JSON.parse(fs.readFileSync(JSON_FILE));

    var user = null;
    Object.keys(data.users).forEach((v, i, a) => {
        var u = data.users[v];
        if (u.token == token) {
            user = u;
            return;
        }
    })

    if (!user) {
        return res.json({ status: 'fail', data: 'Invalid token' });
    }

    const response_data = user;
    res.json({ status: 'success', data: response_data });
    console.log('url: /api/account/auth, Success called');
});


router.get('/:userId', (req, res) => {

    // Load the existing data from the JSON file
    const data = JSON.parse(fs.readFileSync(JSON_FILE));

    // Find the user with the provided user ID
    const userId = parseInt(req.params.userId);
    const user = data.users[userId];
    if (!user) {
        return res.json({ status: 'fail', data: 'User not found' });
    }

    res.json({ status: 'success', data: user });
});

router.put('/:userId', (req, res) => {
    console.log("update user")
    console.log(req.body)
    // Get the request JSON data
    const userId = req.params.userId;
    // Handle POST request for /users endpoint
    const data = JSON.parse(fs.readFileSync(JSON_FILE));

    // Find the user with the provided phone and password
    var user = null;
    Object.keys(data.users).forEach((v, i, a) => {
        var u = data.users[v];
        if (u.id == userId) {
            user = u;
            return;
        }
    })

    if (!user) {
        return res.json({ status: 'fail', data: 'Not Exists User' });
    }
    
    console.log("start update user")
    console.log(req.body)
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.email = req.body.email;
    user.phoneNumber = req.body.phoneNumber;
    user.address = req.body.address;
    user.payment.cardnum = req.body.cardnum;
    user.payment.holder = req.body.holder;
    user.payment.expiry = req.body.expiry;
    user.payment.type = req.body.type ?? "Visa";
    user.payment.cvv = req.body.cvv;

    data.users[userId] = user;
    fs.writeFileSync(JSON_FILE, JSON.stringify(data));

    res.json({ status: 'success', data: "Updated" });
    console.log('url: /api/account/:userId, Success updated');
});


module.exports = router;