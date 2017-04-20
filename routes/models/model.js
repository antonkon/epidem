var mongoose = require('mongoose');
var crypto = require('crypto');

mongoose.connect('mongodb://192.168.88.242/epidem');


var schema = new mongoose.Schema({
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
    email: {
        type: String,
        unique: true,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    isValid: {
        type: Boolean,
        default: false
    }
});

schema.methods.encryptPwd = function(pwd) {
    return crypto.createHmac('sha1', pwd)
        .update(this.salt)
        .digest('hex');
};

schema.virtual('pwd')
    .set(function(pwd) {
        this._plainPassword = pwd;
        this.salt = Math.random() + '';
        this.hashedPwd = this.encryptPwd(pwd);
    })
    .get(function() { return this._plainPassword; });

schema.methods.checkPwd = function(pwd) {
    // var a = this.encryptPwd(pwd);
    // var b = this.hashedPwd;
    // console.log(a);
    // console.log(b);

    // return a === b;

    return this.encryptPwd(pwd) === this.hashedPwd;
};

var quest = new mongoose.Schema({ name: String, any: {} });


exports.Question = mongoose.model('quest', quest);
exports.Register = mongoose.model('register', schema);