'use strict'
const User = require('../model/user');

exports.register = (email, password) =>

    new Promise((resolve, reject) => {
        const newUser = new User({
            email: email,
            password: password
        });

        newUser.isNew = true;

        newUser.save()

            .then((users) => resolve({ status: 201, message: 'User Registered Sucessfully !', user: users[0] }))

            .catch(err => {

                if (err.code == 11000) {

                    reject({ status: 409, message: 'User Already Registered !' });

                } else {

                    reject({ status: 500, message: 'Internal Server Error !' });
                }
            });
    })
