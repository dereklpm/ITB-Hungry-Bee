const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const orderDataPath = path.join(__dirname, '../json/order.json');
const userDataPath = path.join(__dirname, '../json/user.json');
const restaurantDataPath = path.join(__dirname, '../json/restaurant.json');

// API endpoint to submit a new order
router.post("/submit", (req, res) => {
    console.log("=====submit order=====")
    // console.log(req.body);
    var data = req.body;
    const userId = data.userId;
    console.log(userId)
    // const restaurantId = req.body.restaurantId;
    // const foodId = req.body.foodId;
    // const totalPrice = req.body.totalPrice;
    // const payment = req.body.payment;

    // Load the user data from the JSON file
    const userData = JSON.parse(fs.readFileSync(userDataPath));
    console.log(userData)

    // Verify that the user ID exists in the user data
    const user = userData.users[userId];
    if (!user) {
        return res.json({ status: "fail", data: "Invalid user ID." });
    }

    // Load the order data from the JSON file
    const orderData = JSON.parse(fs.readFileSync(orderDataPath));

    // Generate a new order ID
    const newOrderId = orderData.orders.length + 1;

    // Create the new order object
    const newOrder = {
        orderId: newOrderId,
        step: 1,
        ...data
    };

    // Add the new order to the order data
    orderData.orders.push(newOrder);

    // Save the updated order data to the JSON file
    fs.writeFile(orderDataPath, JSON.stringify(orderData), (err) => {
        if (err) {
            console.error(err);
            return res.json({ status: "fail", data: "Failed to save order data." });
        }

        // Return the new order ID in the response
        res.json({ status: "success", data: { orderId: newOrderId } });
    });
});

// API endpoint to get order information by order ID
router.get("/details/:orderId", (req, res) => {
    const orderId = parseInt(req.params.orderId);

    // Load the order data from the JSON file
    const orderData = JSON.parse(fs.readFileSync(orderDataPath));

    // Find the order with the given ID
    const order = orderData.orders.find((order) => {
        return order.orderId === orderId;
    });

    // Return an error message if the order is not found
    if (!order) {
        return res.json({ status: "fail", data: "Order not found." });
    }

    console.log("resp order/:orderId")
    console.log(order)

    // Return the order information
    res.json({
        status: "success",
        data: order
    });
});


router.post("/list", (req, res) => {
    const { userId } = req.body;
    console.log("list order: " + userId)
    const orderData = JSON.parse(fs.readFileSync(orderDataPath));

    const orders = orderData.orders.filter((order) => {
        return order.userId === userId;
    });

    if(!orders){
        res.json({
            status: "fail",
            data: "No Orders"
        });
    }

    res.json({
        status: "success",
        data: orders
    });
});

module.exports = router;