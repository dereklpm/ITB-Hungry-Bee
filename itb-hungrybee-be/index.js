const express = require('express');
const app = express();

app.use(express.json());

const accountsRouter = require('./api/accounts');
const ordersRouter = require('./api/orders');
const productRouter = require('./api/product');
const categoryRouter = require('./api/category');

app.use('/api/account', accountsRouter);
app.use('/api/order', ordersRouter);
app.use('/api/product', productRouter);
app.use('/api/category', categoryRouter);


app.listen(3000, () => {
    console.log('Server started on port 3000');
});