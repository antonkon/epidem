var mongoose = require('mongoose');


// модель - аритмия
var aritmia = new mongoose.Schema({
    id_interview: ObjectId,
    r1: boolean,
    r2: boolean,
    r3: Number,
    r4: boolean,
    r5: boolean,
    simtomy: boolean
});

exports.Aritmia = mongoose.model('aritmia', aritmia);


// модель - Болезни почек
var kidneys = new mongoose.Schema({
    id_interview: ObjectId,
    r1: boolean,
    r2: boolean,
    r3: boolean,
    r4: Number,
    r5: Number,
    simtomy: boolean
});

exports.Kidneys = mongoose.model('kidneys', kidneys);


// модель - Болезнь органив дыхания
var breath = new mongoose.Schema({
    id_interview: ObjectId,
    r1: boolean,
    r2: boolean,
    r3: boolean,
    r4: boolean,
    r5: boolean,
    simtomy: boolean
});

exports.Breath = mongoose.model('breath', breath);


// модель - Болезнь глаз
var eyes = new mongoose.Schema({
    id_interview: ObjectId,
    r1: boolean,
    r2: boolean,
    simtomy: boolean
});

exports.Eyes = mongoose.model('eyes', eyes);


// модель - артрит
var arthritis = new mongoose.Schema({
    id_interview: ObjectId,
    r1: boolean,
    r2: boolean,
    r3: boolean,
    simtomy: boolean
});

exports.Arthritis = mongoose.model('arthritis', arthritis);


// модель - гипертензия
var hypertension = new mongoose.Schema({
    id_interview: ObjectId,
    r1: boolean,
    r2: boolean,
    r3: Number,
    r4: Number,
    simtomy: boolean
});

exports.Hypertension = mongoose.model('hypertension', hypertension);

// модель - сколиоз
var scoliosis = new mongoose.Schema({
    id_interview: ObjectId,
    r1: boolean,
    r2: boolean,
    simtomy: boolean
});

exports.Scoliosis = mongoose.model('scoliosis', scoliosis);