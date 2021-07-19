const { getReasonPhrase } = require('http-status-codes');

const sendErrorResponse = (err,res) => {
    console.log(err);
    err = err.name === 'TokenExpiredError' ? {status: 401, error: 'Unauthorized'} : err;
    err = err.code && err.code === 11000 ? {status: 409, error: 'Conflict'} : err;
    err = !isNaN(+err)? {status: err, error: getReasonPhrase(err)} : err;
    return res.status(err.status || 500).json({success: false, error: err.error || 'Server Error'});
};

module.exports = {
    sendErrorResponse
}