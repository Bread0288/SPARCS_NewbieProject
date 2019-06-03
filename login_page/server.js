const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
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
app.use(session({
    secret: '@#@$MYSIGN#@$#$',
    resave: false,
    saveUninitialized: true
   }));

app.use('/api', api);

app.get('/', (req, res) => {
    if(req.session.user) {
        res.redirect('/home');
    }
});

app.get('/passwordFail', (req, res) => {
    res.sendFile(__dirname + '/static/views/password_fail.html');
})

app.get('/windowClose', (req, res) => {
    return res.sendFile(__dirname + '/static/views/close_windows.html');
})

app.use((req, res, next) => {
    if(req.session.user) {
        next();
    } else {
        return res.redirect('/');
    }
})

app.get('/home', (req, res) => {
	return res.sendFile(__dirname + '/static/views/home.html');
})

app.get('/card', (req, res) => {
    res.sendFile(__dirname + '/static/views/card.html');
})

app.get('/suggestions', (req, res) => {
    res.sendFile(__dirname + '/static/views/suggestions.html');
})

app.get('/notice', (req, res) => {
    res.sendFile(__dirname + '/static/views/notice.html');
})

app.get('/logout', (req, res) => {
    if(req.session.user) {
        req.session.destroy(function(err){
        })
        return res.redirect('/');
    }
})

const server = app.listen(80, () => {
	console.log('server running at port 80');
});
