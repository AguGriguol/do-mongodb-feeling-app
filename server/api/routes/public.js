const express = require('express');
const { Segments, Joi, celebrate } = require('celebrate');
const { sendErrorResponse } = require('../utils/errorResponse');

let router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'Hello World!' });
});

router.route('/access').post(
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      identifier: Joi.string().required()
    })
  }),
  async (req, res) => {
    try {
      let access = await req.container.resolve('PublicService').access(req.body);
      return res.status(200).json({ success: true, ...access });
    } catch (err) {
      return sendErrorResponse(err, res);
    }
  }
);

module.exports = router;
