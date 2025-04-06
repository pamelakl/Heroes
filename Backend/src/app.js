const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const config = require('config');

const errorHandler = require('./middlewares/error-handler.middleware')

const apiRouter = require('./routers/api.routers')
const userRouter = require('./routers/user.routers');
const heroRouter = require('./routers/hero.routers');

const { notFound } = require('./utils/response.utils') 

const PRODUCTION = config.get('production');

const app = express();

const whitelist = []
const corsOptions = {
    origin: (origin, callback) => {
        if(whitelist.indexOf(origin) !== -1){
            callback(null, true);
        }
        else{
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PATCH', 'DELETE']
}
app.use(cors(PRODUCTION && corsOptions))
app.use(express.json())
app.use(helmet())

app.get('/', async (_, res) => res.send('Node.js server'));

//app.use('/', apiRouter)
app.use('/', userRouter)
app.use('/', heroRouter);


app.all('*', async (req, res) => notFound(res));
app.use(errorHandler)
module.exports = app;