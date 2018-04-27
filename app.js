const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const layout = require('./views/layout'); 
const models = require('./models');
const routerWiki = require('./routes/wiki')
const routerUser = require('./routes/user')

const app = express();
morgan('tiny');

app.use(bodyParser.urlencoded({extended: false}));
app.use('/users/', routerUser);
app.use('/wiki/', routerWiki);

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
