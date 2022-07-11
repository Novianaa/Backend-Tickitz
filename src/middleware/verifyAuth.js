const jwt = require('jsonwebtoken')
const helperWrapper = require('../helpers/wrapper')
module.exports = {
  isLogin: (req, res, next) => {
    let token = req.headers.authorization.split(' ')[1]
    if (!token) {
      return helperWrapper.response(res, 401, 'Unauthorized User, Token Required')
    } else {
      jwt.verify(token, process.env.JWT_SECRET_KEY, function (err, result) {
        if (err) {
          return helperWrapper.response(res, 403, 'Access Forbidden')
        }
        req.decodeToken = result
        next()
      })
    }
  },
  isAdmin: (req, res, next) => {
    if (req.decodeToken.role !== 'admin') {
      return helperWrapper.response(res, 403, 'Access Forbidden, Only admin can do this feature!')
    }
    next()
  }
}
