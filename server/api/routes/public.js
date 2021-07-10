const express                           = require('express');
const { StatusCodes }                   = require('http-status-codes');
const { Segments, Joi, celebrate }      = require('celebrate');

let router = express.Router();

router.get('/', (req, res) => {
    res.json({ message: 'Hello World!' });
});

router.route('/access')
    .post(
        celebrate({
            [Segments.BODY]: Joi.object().keys({
                identifier: Joi.string(),
            })
        }),
        async (req, res) => {
            try {
                let access = await req.container.resolve('PublicService').access(req.body, req.query, auth);
                return res.status(200).json({success: true, ...access });
            }
            catch (err) {
                return err
            }
        });

module.exports = router;
