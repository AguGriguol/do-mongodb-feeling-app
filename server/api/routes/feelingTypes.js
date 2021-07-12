const express = require("express");
const { Segments, Joi, celebrate } = require("celebrate");
const { sendErrorResponse } = require("../utils/errorResponse");

let router = express.Router();

router.route("/").get(
    celebrate({
        [Segments.QUERY]: Joi.object().keys({
            code: Joi.string(),
        }),
    }),
    async (req, res) => {
        try {
            let types = await req.container
                .resolve("FeelingTypeService")
                .get(req.query);
            return res.status(200).json({ success: true, ...types });
        } catch (err) {
            return sendErrorResponse(err, res);
        }
    }
);

module.exports = router;
