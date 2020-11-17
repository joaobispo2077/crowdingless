const multer = require('multer');
const path = require('path');
const crypto = require('crypto');
const AWS = require('aws-sdk');
const multerS3 = require('multer-s3');

const storageTypes = {
  s3: multerS3({
    s3: new AWS.S3(),
    bucket: process.env.bucket,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: 'public-read',
    key: (req, file, cb) => {
      crypto.randomBytes(16, (err, hash) => {
        if(err) cb(err);

        const folder = 'uploads/';

        file.key = folder + `${hash.toString('hex')}-${file.originalname}`;

        cb(null, file.key);
      })
    }
  }),
  //local:
}

const multerConfig = {
  dest: path.resolve(__dirname, '..', '..', 'tmp', 'uploads'),
  storage: storageTypes[s3],
  limits: 10 * 1024 * 1024,
  fileFilter: (req, file, cb) => {
    const allowedMimes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
    ];

    const hasAllowedMimeType = (allowedMimes.includes(file.mimetype));

    if(hasAllowedMimeType){
      cb(null, true);
    } else {
      cb(new Error('Invalid file Type.'));
    }
  }

}