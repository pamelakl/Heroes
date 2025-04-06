const apiService = require('../services/api.service');

const SuccessResponse = require('../models/response.model');
const {ok, created, notFound, badRequest} = require('../utils/response.utils');

const getUsers = async (req, res) => {
    const users = await apiService.getUsers();
    ok(res, {users}, 'Retrieved users successfuly');
};

const getHeroes = async (req, res, next) => {
   try {
    const heroes = await apiService.getHeroes();
    ok(res, {heroes}, 'Retrieved heroes successfuly');
   } catch (err) {
    next(err)
   }
}

const createUser = async (req, res, next) => {
    const userData = req.body;
    try{
        const user = await apiService.createUser(userData);
        created(res, {user}, 'Added new user successfuly');
    } catch(err) {
        next(err);
    }
    
};

const increasePower = async (req, res, next) => {
    try{
        const heroId = req.params.id;
        const hero = await apiService.trainHero(heroId);
        console.log("hero 2" + hero)

        ok(res, {hero}, 'Updated Power Level');
    }
    catch(err){
       console.log(err.message)
      res.status(400).json({ message: err.message});
    }
}

const addHeroToUser = async (req, res, next) => {
    try{
        const userId = req.params.id;
        const heroData = req.body;
        
        await apiService.addHeroToUser(userId, heroData);
        ok(res, heroData, "Hero successfully assigned to user");

    } catch (error) {
      next(error)
    }
}

const getHeroesOfUser = async (req, res, next) => {
    try{
       // console.log("1")
        const userId = req.params.id;
       // console.log("2");

        heroes = await apiService.getHeroesOfUser(userId);

        ok(res, {heroes}, 'Retrieved heroes successfuly');
    }catch(err){
        next(err);
    }
}

const login = async(req, res, next) => {
    const userData = req.body;
    try{
        const user = await apiService.login(userData);
        if(user)
            ok(res, {user}, 'User was logged in successsfully');
        else{
            notFound(res, "User not found");
        }
    }catch(err){
        console.log("got to err")
        next(err);
    }
}


const logout = async(req, res, next) => {
    try{
        ok(res, 'User was logged out successsfully', {});
    }catch(err){
        next(err)
    }
}

module.exports = {
    getUsers,
    getHeroes,
    createUser,
    login,
    logout,
    increasePower,
    addHeroToUser,
    getHeroesOfUser
}