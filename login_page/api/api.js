const express = require('express');
const User = require('../models/user');

const router = express.Router();

router.post('/sign_in', (req, res) => {
    console.log(req.body);
	 const user = new User();
	 user.id = req.body.id;
	 user.pw = req.body.password;
    console.log('id : ' + user.id + ' pw : ' + user.pw);
    user.save((err, result) => {
        if (err) return res.status(500).end('DB error');
        //return res.sendStatus(200);
        return res.redirect('/');
    })
})

module.exports = router;
