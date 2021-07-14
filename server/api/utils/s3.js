const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

// Set S3 endpoint to DigitalOcean Spaces
const spacesEndpoint = new aws.Endpoint(process.env.BUCKET_BASE_URL);
const s3 = new aws.S3({
    endpoint: spacesEndpoint,
});

const s3Upload = multer({
    storage: multerS3({
        s3,
        bucket: process.env.BUCKET_NAME,
        key: (_, file, cb) => cb(null, `${process.env.BUCKET_PATH_FILE}${file.originalname}`)
    }),
});

const getFile = (name) => s3.getSignedUrl('getObject', {
    Bucket: process.env.BUCKET_NAME,
    Key: `${process.env.BUCKET_PATH_FILE}${name}`,
    Expires: 60 * 60 //1hour
});


module.exports = {
    s3Upload,
    getFile
}
