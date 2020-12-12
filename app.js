const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 80;
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
mongoose.connect('mongodb://localhost/contact', { useNewUrlParser: true });
const hostname = '127.0.0.1';

const ContactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    desc: String
});

const contact = mongoose.model('contact', ContactSchema);

app.use('/static', express.static('static'));
app.use(express.urlencoded());

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    res.status(200).render('home.pug');
})

app.get('/about', (req, res) => {
    res.status(200).render('about.pug');
})

app.get('/owners', (req, res) => {
    res.status(200).render('owners.pug');
})

app.get('/contact', (req, res) => {
    res.status(200).render('contact.pug');
})

app.post('/contact', (req, res) => {
    var myData = new contact(req.body);
    myData.save().then(() => {
        res.send("You have succesfully submitted the form.")
    }).catch(() => {
        res.status(400).send("Your item is not saved to the database.")
    });
    //res.status(200).render('contact.pug');
})

app.listen(port, () => {
    console.log(`app started succesfully at port ${port}`);
})