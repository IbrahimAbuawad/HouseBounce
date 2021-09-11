const mongoose = require('mongoose');
const authFunc = require('./authFunc');


const user = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    role: { type: String, required: true, default: 'user', enum: 'user' }
})

user.virtual('token').get(authFunc.forVirtualToken);

user.virtual('capabilities').get(authFunc.forVirtualCapab);

user.pre('save', authFunc.forPre);

user.statics.authenticateBasic = authFunc.forBasic;

user.statics.authenticateWithToken = authFunc.forBearer;

module.exports = mongoose.model('user', user);

