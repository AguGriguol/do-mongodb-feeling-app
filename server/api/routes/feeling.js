const express = require('express');
const { Segments, Joi, celebrate } = require('celebrate');
const { sendErrorResponse } = require('../utils/errorResponse');

let router = express.Router();

router
  .route('/')
  .get(
    celebrate({
      [Segments.QUERY]: Joi.object().keys({
        title: Joi.string(),
        type: Joi.string(),
        created: Joi.string(),
        updated: Joi.string()
      })
    }),
    async (req, res) => {
      try {
        let feelings = await req.container.resolve('FeelingService').get(req.query, req.auth_data);
        return res.status(200).json({ success: true, ...feelings });
      } catch (err) {
        return sendErrorResponse(err, res);
      }
    }
  )
  .post(
    celebrate({
      [Segments.BODY]: Joi.object().keys({
        title: Joi.string().required(),
        type: Joi.string().required(),
        shortDescription: Joi.string(),
        feelingDescription: Joi.string().allow(''),
        feelingPicture: {
          fileName: Joi.string()
        }
      })
    }),
    async (req, res) => {
      try {
        let feeling = await req.container.resolve('FeelingService').create(req.body, req.auth_data);
        return res.status(200).json({ success: true, ...feeling });
      } catch (err) {
        return sendErrorResponse(err, res);
      }
    }
  );

router
  .route('/:identifier')
  .get(async (req, res) => {
    try {
      let feeling = await req.container.resolve('FeelingService').getOne(req.params.identifier);
      return res.status(200).json({ success: true, ...feeling });
    } catch (err) {
      return sendErrorResponse(err, res);
    }
  })
  .put(
    celebrate({
      [Segments.BODY]: Joi.object().keys({
        title: Joi.string(),
        type: Joi.string(),
        shortDescription: Joi.string(),
        feelingDescription: Joi.string(),
        feelingPicture: {
          fileName: Joi.string()
        },
        deletePicture: Joi.boolean()
      })
    }),
    async (req, res) => {
      try {
        let feeling = await req.container.resolve('FeelingService').update(req.params.identifier, req.body);
        return res.status(200).json({ success: true, ...feeling });
      } catch (err) {
        return sendErrorResponse(err, res);
      }
    }
  )
  .delete(async (req, res) => {
    try {
      await req.container.resolve('FeelingService').deleteOne(req.params.identifier);
      return res.status(200).json({ success: true });
    } catch (err) {
      return sendErrorResponse(err, res);
    }
  });
module.exports = router;
