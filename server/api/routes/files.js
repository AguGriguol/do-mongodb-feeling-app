const express = require('express');
const { getFile, s3Upload } = require('../utils/s3');
const { sendErrorResponse } = require('../utils/errorResponse');

let router = express.Router();

router.route('/').post(s3Upload.single('file'), async (req, res) => {
    try {
        return res
            .status(200)
            .json({ success: true, fileName: req.file.originalname });
    } catch (error) {
        return sendErrorResponse(error, res);
    }
});

router.route('/:file').get(async (req, res) => {
    try {
        let url = getFile(req.params.file);
        return res.status(200).json({ success: true, url });
    } catch (error) {
        return sendErrorResponse(error, res);
    }
});
module.exports = router;
