const express = require('express');
const User = require('../models/user');
const Text = require('../models/text');

const router = express.Router();

router.post('/login', (req, res) => {
    console.log(req.body);
    User.findOne({id: req.body.id, pw: req.body.password}, (err, user) => {
        if(err){
            console.log(err);
           return res.redirect('/');
        }
       else if(user === null){
           console.log('ID and PW are not matched');
           return res.redirect('/');
       }
       else{
		   req.session.user = user;
           return res.redirect('/home');
       }
    });
})

router.post('/sign_up', (req, res) => {
	console.log(req.body);
	const name = req.body.username;
	const dormitory = req.body.dormitory;
	const password = req.body.password;
	const password2 = req.body.password2;
	
    if(password !== password2){
        return res.redirect('/passwordFail');
    }else{
        const newuser = new User();
        newuser.id = name;
        newuser.pw = password;
        newuser.dormitory = dormitory;

        newuser.save(err => {
            if(err) {
                console.log(err);
                return res.sendFile('/');
            }
			console.log('good database created');
            return res.sendFile('/Users/iulke/Desktop/SPARCS_NewbieProject/login_page/static/views/close_windows.html');
        })
	}
})

router.get('/lostandfound', (req, res) => {
	res.send('/Users/iulke/Desktop/SPARCS_NewbieProject/login_page/static/views/card.html');
})

router.get('/suggestload', (req, res) => {
	console.log("GET suggestload is started");
	Text.find({suggest: true}, (err, result) => {
	  if (err) return res.status(500).end('DB error');
	  return res.json(result);
	});
});

router.get('/noticeload', (req, res) => {
	console.log("GET noticeload is started");
	Text.find({notice: true}, (err, result) => {
	  if (err) return res.status(500).end('DB error');
	  return res.json(result);
	});
});

router.post('/load', (req, res) => {
	const text = new Text();
	text.suggest = req.body.check1;
	text.notice = req.body.check2;
	text.title = req.body.title;
	text.text = req.body.text;
	text.date = req.body.date;
	text.save((err, result) => {
		if (err) return res.status(500).end('DB error');
		console.log("success!");
    	return res.sendStatus(200);
	})
})

module.exports = router;
