const express = require('express');
const app = require('../app')

const validate = require('../middlewares/validate.middleware');
const {loginRequestSchema} = require('../schemas/login.schema')

const apiController = require('../controlllers/api.controller')

const userRouter = express.Router();

userRouter.post('/users/login', validate(loginRequestSchema), apiController.login);

userRouter.post('/users/signup', apiController.createUser);

userRouter.post('/users/logout', apiController.logout);

userRouter.post('/users/:id', apiController.addHeroToUser)

module.exports = userRouter;