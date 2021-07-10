const { isCelebrateError } = require('celebrate');
//Routes
module.exports = (app) => {
    // public routes
    app.use('/api/v1', require('./public'));
    // authentication middleware
    app.use(require('../middlewares/authentication'));
    // private routes
    // app.use('/api/users', require('./users'));

    //Error handling middleware
    app.use((err, req, res, next)=> {
        if (!isCelebrateError(err)) {
            return next(err);
        }
console.log(err);
        return res.status(400).send({ success: false, error: 'Bad Request' });
    });
}