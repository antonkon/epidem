var mongoose = require('mongoose');
var crypto = require('crypto');

// модель зарегистрированного админа
var admin_reg = new mongoose.Schema({
    login: {
        type: String,
        unique: true,
        required: true
    },
    hashedPwd: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

admin_reg.methods.encryptPwd = function(pwd) {
    return crypto.createHmac('sha1', pwd)
        .update(this.salt)
        .digest('hex');
};

admin_reg.virtual('pwd')
    .set(function(pwd) {
        this._plainPassword = pwd;
        this.salt = Math.random() + '';
        this.hashedPwd = this.encryptPwd(pwd);
    })
    .get(function() { return this._plainPassword; });

admin_reg.methods.checkPwd = function(pwd) {
    // var a = this.encryptPwd(pwd);
    // var b = this.hashedPwd;
    // console.log(a);
    // console.log(b);

    // return a === b;

    return this.encryptPwd(pwd) === this.hashedPwd;
};

exports.AdminRegister = mongoose.model('admin_register', admin_reg);