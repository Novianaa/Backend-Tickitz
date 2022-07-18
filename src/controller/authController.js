const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const Auth = require('../model/authModel')
const helperWrapper = require('../helpers/wrapper')

module.exports = {
  register: async (req, res) => {
    try {
      const { first_name, last_name, email, phone_number, password, role } = req.body
      const photo = req.file.filename || 'https://divedigital.id/wp-content/uploads/2021/10/1-min.png'
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
      if (result.length < 1) {
        return helperWrapper.response(res, 404, 'Wrong Email / Password')
      }
      if ((await bcrypt.compare(password, result[0].password)) == false) {
        return helperWrapper.response(res, 400, "Wrong Email / Password");
      }
      const token = jwt.sign({ user_id: result[0].id, role: result[0].role }, process.env.JWT_SECRET_KEY, {
        expiresIn: '1 day'
      })
      return helperWrapper.response(res, 201, 'Success login', {
        user_id: result[0].id,
        token,
        photo: result[0].photo,
        role: result[0].role
      })

    } catch (err) {
      // console.log(err.message)
      return helperWrapper.response(res, 404, `Bad request ${err}`)
    }
  }
}