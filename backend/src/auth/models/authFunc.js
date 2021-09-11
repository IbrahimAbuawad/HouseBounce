const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secret = (process.env.SECRET || 'infoGraph');

const forVirtualToken = function () {
    let token = {
        email: this.email
    }
    return jwt.sign(token, secret)
}

const forVirtualCapab = function () {
    let acl = {
        user: ['read', 'create', 'update', 'delete'],
        admin: ['read', 'create', 'update', 'delete', 'accept']

    };
    return acl[this.role];
}

const forPre = async function () {
    try {
        if (this.isModified('password')) {
            this.password = await bcrypt.hash(this.password, 10)
        }
    }
    catch (error) {
        throw new Error(error.message)
    }
}


const forBasic = async function (email, password) {
    try {
        const user = await this.findOne({ email })
        
        const valid = await bcrypt.compare(password, user.password)
        console.log(valid,'valid');
        if (valid) {
            return user;
        }
        throw new Error('Invalid User');
    }
    catch (error) {
        throw new Error(error.message);
    }
}

const forBearer = async function (token) {
    try {

        const parsedToken = jwt.verify(token, secret);
        const user = this.findOne({ email: parsedToken.email })
        if (user) return user;
        throw new Error("Access Denied");
    } catch (e) {
        throw new Error(e.message)
    }
}


module.exports = { forVirtualToken, forVirtualCapab, forPre, forBasic, forBearer }