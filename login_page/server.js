const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const api = require('./api/api');
const app = express();

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongodb connection error:'));
db.once('open', () => console.log('connected to mongodb'));
mongoose.connect('mongodb://localhost/login_page', { useNewUrlParser: true });

app.use(express.static('static/views'));
app.set('views', __dirname + '/static/views');
app.engine('html', ejs.renderFile);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', api);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/static/views/main.html');
});

const server = app.listen(80, () => {
	console.log('server running at port 80');
});
