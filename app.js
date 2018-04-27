const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const layout = require('./views/layout'); 

const app = express();
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send(layout('Hello world!'));
});

app.listen(3000);