const express = require('express');

const authRouter = express.Router();

const User = require('./models/users.js');
const Admin = require('./models/admin');
const basicAuth = require('./middleware/basic.js');
const DataCollection = require('../routes/data.collection');

const userInstCollection = new DataCollection(User);
const adminInstCollection = new DataCollection(Admin);



authRouter.post('/signup/admin', async (req, res, next) => {
    try {

        const obj = req.body;

        const userData = await userInstCollection.get();
        if (userData) {
            userData.map(e => {
                if (obj.email === e.email) next('Email is already exist')
            })
        }
        const newRecord = await adminInstCollection.create(obj);
        res.status(201).json(newRecord);
    } catch (error) {
        next('Email is already exist')
    }
})


authRouter.post('/signup/user', async (req, res, next) => {
    try {

        const obj = req.body;
        const adminData = await adminInstCollection.get();
        if (adminData) {
            adminData.map(e => {
                if (obj.email === e.email) next('Email is already exist')
            })
        }

        const newRecord = await userInstCollection.create(obj);
        res.status(201).json(newRecord);
    } catch (error) {
        next('Email is already exist')
    }
})


authRouter.post('/signin/admin', basicAuth.forAdmin, (req, res, next) => {
    try {
        console.log(req.user, 'req.user');
        console.log(req.user.token, 'req.user.token');
        const user = {
            user: req.user,
            token: req.user.token
        };
        res.status(200).json(user);
    } catch (e) {
        res.send('Incorrect email or password');
        throw new Error(e.message)
    }
})


authRouter.post('/signin/user', basicAuth.forUsers, (req, res, next) => {
    try {
        console.log(req, 'req');
        const user = {
            user: req.user,
            token: req.user.token
        };
        res.status(200).json(user);
    } catch (e) {
        res.send('Incorrect email or password');
    }
})

authRouter.get('/all', async (req, res, next) => {
    try {

        const all = [];
        const users = await userInstCollection.get();
        console.log(users);
        const admins = await adminInstCollection.get();
        users.map(user => all.push(user));
        admins.map(admin => all.push(admin));

        res.send(all);
    } catch (error) {
        throw new Error(error.message)
    }

})

module.exports = authRouter;