const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const layout = require('./views/layout'); 
const models = require('./models');

const app = express();
app.use(morgan);
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send(layout('Hello world!'));
});

const init = async () => {
    await models.db.sync({force: true});
    app.listen(3000).listen(3000, () =>{
        console.log(`Server is listening on port 3000!`);
    })
}

init();
