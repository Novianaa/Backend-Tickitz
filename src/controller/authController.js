const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const Auth = require('../model/authModel')
const helperWrapper = require('../helpers/wrapper')

module.exports = {
  register: async (req, res) => {
    try {
      const { first_name, last_name, email, phone_number, password, role } = req.body
      if (role) {
        return helperWrapper.response(res, 404, `Can't input role`)
      }
      if (!first_name || !last_name || !email || !password || !phone_number) {
        return helperWrapper.response(res, 404, 'Fields must be filled')
      }
      if (password.length < 8) {
        return helperWrapper.response(res, 404, 'Password must be more than 8 characters')
      }
      const result = await Auth.register(first_name, last_name, email, phone_number, password)
      return helperWrapper.response(res, 201, 'Success create new acount', result)
    } catch (err) {
      return helperWrapper.response(res, 404, `Bad request ${err.message}`)
    }
  },
  login: async (req, res) => {
    try {
      let { email, password } = req.body
      if (!email || !password) {
        return helperWrapper.response(res, 404, 'Fields must be filled')
      }
      email = email.toLowerCase()

      const result = await Auth.login(email, password)
      return helperWrapper.response(res, 201, 'Success login', result)

    } catch (err) {
      return helperWrapper.response(res, 404, `Bad request ${err.message}`)
    }
  }
}