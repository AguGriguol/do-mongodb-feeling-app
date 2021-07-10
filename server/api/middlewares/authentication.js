
const express               = require('express');
const { sendErrorResponse } = require('../utils/errorResponse');
const { StatusCodes }       = require('http-status-codes');
const jwt                   = require('jsonwebtoken');
const User                  = require('../models/user');

const router = express.Router();

// middleware to authenticate requests
router.use(async (req, res, next) => {

    try {

        let bearer = req.headers['authorization'] && req.headers['authorization'].split('Bearer ').length ? req.headers['authorization'].split('Bearer ')[1] : null;
        let token = bearer || req.query.token || req.headers['x-access-token'] || req.body.token;
        if (!token || token.length === 0) throw new Error(StatusCodes.UNAUTHORIZED);

        let decoded = jwt.verify(token, process.env.API_KEY);
        if (decoded.type !== 'access') throw new Error(StatusCodes.UNAUTHORIZED);

        const user = await User.findById(decoded._id).lean();
        if (!user || !user.enabled) throw new Error(StatusCodes.UNAUTHORIZED);

        req.auth_data = { user: { _id: user._id }};

        next();
    }
    catch (err) {
        return sendErrorResponse(StatusCodes.UNAUTHORIZED, res);
    }

});

module.exports = router;
