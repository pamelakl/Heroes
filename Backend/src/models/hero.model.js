const mongoose = require('mongoose');
const validator = require('validator');

const heroSchema = new mongoose.Schema({       /////////// CHANGE TO HEROES
    heroName: {
        type: String,
        required: [true, 'First name is required'],
    },
    power: {
        type: String,
        required: [true, 'Last name is required'],
    },
    colors: {
        type: String,
        required: [true, 'Colors are required']
    },
    image: {
        type: String,
        required: true,
    },
    powerLevel: {
        startingPower: {type: Number, required: true },
        currentPower: {type: Number, required: true}
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    startingDate: {
        type: Date,
        defaulf: null
    },
    trainingCount: {
        type: Number,
        default: 0
    },
    lastTrainedDate: {
        type: Date,
        default: null
    }
}, {
    timestamps: true,
});

const Hero = mongoose.model('Hero', heroSchema, 'Hero');

module.exports = Hero;