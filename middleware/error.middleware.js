const ApiEror = require('../exceptions/api.error.js')

module.exports = (err, req, res, next) => {

    if (err instanceof ApiEror) return res.status(err.status).json({message: err.message, errors: err.errors});
    console.log(err)
    return res.status(500).json({message: 'Internal error'});

}