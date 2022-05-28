module.exports = class ApiEror extends Error{
    status;
    errors;

    constructor(status, message, errors = []){
        super(message);
        this.status = status;
        this.errors = errors;
    }

    static UnathorizedError(){ return new ApiEror(401, 'Not authorised') }

    static BadRequestError(message, errors = []) { return new ApiEror(400, message, errors) }

    static DatabaseError(e) { return new ApiEror(500, 'database error: '+ e.message, e) }

}