
const express           = require('express');

const router = express.Router();

// middleware to authenticate requests
router.use(async (req, res, next) => {

    try {
        let credentials = auth(req);

        next();
    }
    catch (err) {
        return errorResponse({ status: StatusCodes.UNAUTHORIZED, error: 'Unauthorized' }, res);
    }

});

module.exports = router;
