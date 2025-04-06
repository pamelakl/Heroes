const { NotExistError, AlreadyExistsError } = require('../utils/error.utils');
const bcrypt = require('bcrypt');
const User = require('../models/user.model')
const Hero = require('../models/hero.model')
const mongoose = require("mongoose");

const getUsers = () => {
    return users;
};

const getUser = async (id) => {
    const user = await User.findById(id);
    return user;
}

const getHeroes = async () => {
   // throw new AlreadyExistsError("User already exists")
    const heroes = await Hero.find();
    console.log(heroes)
   // console.log(heroes)
    return heroes;
}

const addHeroToUser = async (userId, heroData) => {
    const user = await getUser(userId);
    console.log("1")
    if (!user) {
          //  return res.status(404).json({ message: "User not found" });
          console.log("2")
        throw new NotExistError("user not found");
    }
    if (heroData.owner) {
        console.log("3")
        throw new AlreadyExistsError("Hero already owned by another user")
          //  return res.status(400).json({ message: "Hero already owned by another user" });
    }
    console.log(heroData);
    const hero = await getHero(heroData._id);
    hero.owner = userId;
    await hero.save();
    user.heroes = user.heroes ? [...user.heroes, hero] : [hero];
    await user.save();
}

const getHero = async (id) => {
    const hero = await Hero.findById(id);
    return hero;
}

const createUser = async (userData) => {
    let user = await User.findOne({ email: userData.email });
    if (user) throw new AlreadyExistsError("User already exists");
    
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*\W).{8,}$/;
    if (!passwordRegex.test(userData.password)) {
        throw new Error("Password must be at least 8 characters long, include one uppercase letter, one digit, and one non-alphanumeric character.");
    }

    user = new User(userData);
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt)
    await user.save();

    return user;
}

const login = async (userData) => {
    const user = await User.findOne({ email: userData.email });
    if(!user) throw new NotExistError("Email or password is wrong")
    if(user && user.password === userData.password){
        return user;
    }
    throw new Error("Email or password is wrong")
}

const getHeroesOfUser = async (userId) => {
    const user = await getUser(userId);
    console.log("user:" + user);
    await user.populate('heroes');
    console.log("populated user:" + user);
   // const heroes = user.heroes;
    return user.heroes;
}

const trainHero = async (heroId) => {
    const hero = await getHero(heroId);

    const today = new Date().toISOString().split('T')[0]; // Get YYYY-MM-DD
    const lastTrained = hero.lastTrainedDate ? hero.lastTrainedDate.toISOString().split('T')[0] : null;

    console.log(lastTrained);

    if (lastTrained !== today) {
        hero.trainingCount = 0;
        hero.lastTrainedDate = new Date();
    }

    if (hero.trainingCount >= 5) {
        throw new Error('Training limit reached for today');
    }

    console.log("okay")
    
    hero.powerLevel.currentPower = parseFloat(hero.powerLevel.currentPower * (1 + Math.random()/10)).toFixed(2);
    hero.trainingCount++;
    await hero.save();
    console.log("hero 1" + hero)
    return hero;
    
}

module.exports = {
    getUsers, 
    getUser,
    createUser,
    getHeroes,
    getHero,
    getHeroesOfUser,
    login,
    addHeroToUser,
    trainHero
}