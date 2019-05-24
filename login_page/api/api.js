const express = require('express');
const User = require('../models/user');

const router = express.Router();

router.post('/sign_in', (req, res) => {
    const user = new User();
    console.log('id : ' + req.body.id + ' pw : ' + req.body.password);
    user.id = req.body.id;
    user.pw = req.body.password;
    user.save((err, result) => {
        if (err) return res.status(500).end('DB error');
        //return res.sendStatus(200);
        return res.redirect('/');
    })
})

module.exports = router;