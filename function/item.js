'use strict'
const Item = require('../model/item');

exports.addItem = (item) =>

    new Promise((resolve, reject) => {
        const newItem = new Item({
            user: item.username,
            name: item.name,
            description: item.description,
            expireDate: item.expireDate
        });

        newItem.isNew = true;

        newItem.save()

            .then((item) => resolve({ status: 201, message: 'Item Added Sucessfully !', item: item }))

            .catch(err => reject({ status: 500, message: 'Internal Server Error !' }));

    })

exports.getItem = (username) =>

    new Promise((resolve, reject) => {
        Item.find({ user: username })

            .then((items) => resolve({ status: 200, items: items }))

            .catch(err => reject({ status: 500, message: 'Internal Server Error !' }));

    })
