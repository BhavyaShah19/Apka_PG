const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 80;
const hostname = '127.0.0.1';

app.use('/static', express.static('static'));
app.use(express.urlencoded());

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    res.status(200).render('index.pug');
})

app.listen(port, () => {
    console.log(`app started succesfully at port ${port}`);
})