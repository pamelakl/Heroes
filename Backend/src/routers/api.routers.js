const express = require('express');
const app = require('../app')

const validate = require('../middlewares/validate.middleware');
const {loginRequestSchema} = require('../schemas/login.schema')

const apiController = require('../controlllers/api.controller')

const router = express.Router();

router.post('/users/login', validate(loginRequestSchema), apiController.login);

router.post('/users/signup', apiController.createUser);

router.post('/users/logout', apiController.logout);

router.get('/heroes', apiController.getHeroes);

router.put('/heroes/:id', apiController.increasePower)

router.post('/users/:id', apiController.addHeroToUser)

router.get('/heroes/:id', apiController.getHeroesOfUser)

module.exports = router;