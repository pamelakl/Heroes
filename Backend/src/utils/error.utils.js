class AlreadyExistsError extends Error {
    constructor(message){
        super(message);
        this.statusCode = 409;
    }
}

class NotExistError extends Error {
    constructor(message){
        super(message);
        this.statusCode = 404;
    }
}

module.exports = {
    AlreadyExistsError,
    NotExistError
}