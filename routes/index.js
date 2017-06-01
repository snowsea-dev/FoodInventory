'use strict';
var express = require('express');
var router = express.Router();
var user = require('../function/user');
var item = require('../function/item');

module.exports = function(passport) {
    router.post('/login',
        passport.authenticate('local'),
        function (req, res) {
            // If this function gets called, authentication was successful.
            // `req.user` contains the authenticated user.
            res.status(200).json(req.user);
        });

    router.post('/register', (req, res) => {

        user.register(req.body.email, req.body.password)

        .then(result => {
            res.status(201).json(result)
        })

        .catch(err => {
            res.status(err.status).json({ message: err.message })
        });
    });

    router.post('/add_item', (req, res) => {

        item.addItem(req.body.item)

            .then(result => {
                res.status(201).json(result)
            })

            .catch(err => {
                res.status(err.status).json({ message: err.message })
            });
    });

    router.post('/get_item', (req, res) => {

        item.getItem(req.body.username)

            .then(result => {
                res.status(200).json(result)
            })

            .catch(err => {
                res.status(err.status).json({ message: err.message })
            });
    });


    /* GET home page. */
    router.get('/', function (req, res) {
        res.render('index', { title: 'Express' });
    });

    return router;
}
