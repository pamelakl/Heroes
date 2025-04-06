const express = require('express');
const app = require('../app')

const validate = require('../middlewares/validate.middleware');
const {loginRequestSchema} = require('../schemas/login.schema')

const apiController = require('../controlllers/api.controller')

const heroRouter = express.Router();

heroRouter.get('/heroes', apiController.getHeroes);

heroRouter.put('/heroes/:id', apiController.increasePower)

heroRouter.get('/heroes/:id', apiController.getHeroesOfUser)

module.exports = heroRouter;