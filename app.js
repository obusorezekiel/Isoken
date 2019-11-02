const http = require('http');
const express = require('express')

const app = express();

app.use('/add-product', (req, res, next) => {
    console.log('In another middleware')
    res.send('<h1>Add Product</h1>');
})

const server = http.createServer(app)
server.listen(3800);