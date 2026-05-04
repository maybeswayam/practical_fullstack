const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/user');

router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', async (req, res) => {
    try {
        const { username, password, nationality, travelStyle, favoriteContinent } = req.body;
        const user = new User({ username, nationality, travelStyle, favoriteContinent });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if (err) return next(err);
            res.redirect('/journals');
        });
    } catch (e) {
        console.log(e);
        res.redirect('/register');
    }
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', passport.authenticate('local', { failureRedirect: '/login' }), (req, res) => {
    res.redirect('/journals');
});

router.get('/logout', (req, res, next) => {
    req.logout(function (err) {
        if (err) { return next(err); }
        res.redirect('/journals');
    });
});

module.exports = router;