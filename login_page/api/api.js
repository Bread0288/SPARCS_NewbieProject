const express = require('express');
const User = require('../models/user');

const router = express.Router();

router.post('/home', (req, res) => {
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
			return res.sendFile('/home/sparcs/SPARCS_NewbieProject/login_page/static/views/home.html');
		}
	 });
	 /*
	 const user = new User();
	 user.id = req.body.id;
	 user.pw = req.body.password;
    console.log('id : ' + user.id + ' pw : ' + user.pw);
    user.save((err, result) => {
        if (err) return res.status(500).end('DB error');
        //return res.sendStatus(200);
        return res.redirect('/');
    })
	 */
})

module.exports = router;
