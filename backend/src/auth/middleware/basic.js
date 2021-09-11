const base64 = require('base-64');
const User = require('../models/users');
const Admin = require('../models/admin');


const forUsers = async (req, res, next) => {
    try {

        if (!req.headers.authorization) return res.status(403).send('Invalid Login');

        let basic = req.headers.authorization.split(' ').pop();
        let [user, pass] = base64.decode(basic).split(':');
        req.user = await User.authenticateBasic(user, pass);
        next();
    } catch (error) {
        res.status(403).send('Invalid Login');
    }

}

const forAdmin = async (req, res, next) => {
    try {
        if (!req.headers.authorization) return res.status(403).send('Invalid Login');

        let basic = req.headers.authorization.split(' ').pop();
        let [user, pass] = base64.decode(basic).split(':');
        
        req.user = await Admin.authenticateBasic(user, pass);
        console.log(req.user, pass);
        next();
    } catch (error) {
        res.status(403).send('Invalid Login');
    }

}

module.exports={forUsers,forAdmin}