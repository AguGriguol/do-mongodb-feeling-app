
const express               = require('express');
const { sendErrorResponse } = require('../utils/errorResponse');
const { StatusCodes }       = require('http-status-codes');

const router = express.Router();

// middleware to authenticate requests
router.use(async (req, res, next) => {

    try {
        let credentials = auth(req);

        next();
    }
    catch (err) {
        return sendErrorResponse(StatusCodes.UNAUTHORIZED, res);
    }

});

module.exports = router;
