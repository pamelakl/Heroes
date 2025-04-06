const { response } = require('../app');
const {internalServerError} = require('../utils/response.utils')

const errorHandler = (err, req, res, next) => {
    console.log("got to error handler")
    res.status(err.statusCode || 500).json({ error: err.message || "Internal Server Error"})
  //  internalServerError(res);
};
 
module.exports = errorHandler;