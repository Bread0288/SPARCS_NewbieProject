const express = require('express');
const mongoose = require('mongoose');
const app = express();

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongodb connection error:'));
db.once('open', () => console.log('connected to mongodb'));
mongoose.connect('mongodb://localhost/SPARCS_NewbieProject/login_page', { useNewUrlParser: true });

app.use(express.static('static/views'));
app.set('views', __dirname + '/static/views');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.renderFile(__dirname + '/static/views/main.html');
})

