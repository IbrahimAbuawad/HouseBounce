const express = require('express');
const Collection = require('./data.collection');
const bearerAuth = require('../auth/middleware/bearer');
const permissions = require('../auth/middleware/acl');
const property = require('../auth/models/property');
const users = require('../auth/models/users');


const router = express.Router();

const propertyInstCollection = new Collection(property);


router.post('/addprop', bearerAuth.forUsers, permissions('create'), addProperty);
router.get('/getpropforusers/:userId', bearerAuth.forUsers, permissions('read'), getForUsers);
router.get('/getpropforadmins', bearerAuth.forAdmin, permissions('read'), getForAdmins);
router.put('/changeStatus/:propId', bearerAuth.forAdmin, permissions('update'), updateStatus);


async function addProperty(req, res) {
    try {
        let obj = req.body
        let addNew = await propertyInstCollection.create(obj);
        res.status(200).json(addNew);
    } catch (e) {
        throw new Error(e.message)
    }
}



async function getForUsers(req, res) {
    try {
        // let users = await 
        let userId = req.params.userId
        let getProp = await property.find({ ownerId: userId });
        res.status(200).json(getProp);
    } catch (e) {
        throw new Error(e.message)
    }
}

async function getForAdmins(req, res) {
    try {
        let getProp = await propertyInstCollection.get();
        res.status(200).json(getProp);
    } catch (e) {
        throw new Error(e.message)
    }
}

async function updateStatus(req, res) {
    try {
        let obj = req.body
        let propId = req.params.propId
        let updateProp = await propertyInstCollection.update(propId, obj);
        res.status(200).json(updateProp);
    } catch (e) {
        throw new Error(e.message)
    }
}

module.exports = router