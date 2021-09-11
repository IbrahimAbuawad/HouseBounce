
const Users = require('../models/users.js')
const Admin = require('../models/admin')


const forUsers = async (req, res, next) => {

    try {
        if (!req.headers.authorization) next('Access Denied');

        const token = req.headers.authorization.split(' ').pop();
        const validUser = await Users.authenticateWithToken(token);

        req.user = validUser;
        console.log(req.user, 'req.user');
        req.token = validUser.token;
        next();

    } catch (e) {
        next('Access Denied');
    }

}

const forAdmin = async (req, res, next) => {

    try {
        if (!req.headers.authorization) next('Access Denied');

        const token = req.headers.authorization.split(' ').pop();
        const validUser = await Admin.authenticateWithToken(token);
        console.log(req.user, 'before req.user');

        req.user = validUser;
        console.log(req.user, 'after req.user');
        req.token = validUser.token;
        next();

    } catch (e) {
        next('Access Denied');
    }

}


module.exports = { forUsers, forAdmin }
