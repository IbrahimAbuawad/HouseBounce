const mongoose = require('mongoose');
const authFunc = require('./authFunc');


const admin = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },    
    role: { type: String, required: true, default: 'admin', enum: 'admin' }
})

admin.virtual('token').get(authFunc.forVirtualToken);

admin.virtual('capabilities').get(authFunc.forVirtualCapab);

admin.pre('save', authFunc.forPre);

admin.statics.authenticateBasic = authFunc.forBasic;

admin.statics.authenticateWithToken = authFunc.forBearer;

module.exports = mongoose.model('admin', admin);
