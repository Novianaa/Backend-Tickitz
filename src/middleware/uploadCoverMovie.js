const multer = require('multer')
const helperWrapper = require('../helpers/wrapper')

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'public/upload/movie')
  },
  filename(req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname)
  },
})
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype == "image/png" ||
    file.mimetype == "image/jpeg" ||
    file.mimetype == "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb({ message: "Extension Not Allow" }, false);
  }
}

const limits = { fileSize: 2 * 1024 * 1024 }
const upload = multer({ storage, fileFilter, limits }).single('cover')

const uploadFilter = (req, res, next) => {
  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return helperWrapper.response(res, 401, err.message, null);
    }
    if (err) {
      return helperWrapper.response(res, 401, err.message, null);
    }
    next();
  });
}

module.exports = uploadFilter