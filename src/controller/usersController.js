const fs = require('fs');
const bcrypt = require('bcrypt')
const Users = require('../model/usersModel')
const helperWrapper = require('../helpers/wrapper')

module.exports = {
  getUsers: async (req, res) => {
    try {
      let { keyword = '', sortBy = '' || 'first_name', orderBy = '' || 'asc' } = req.query
      const result = await Users.getUsers(keyword, sortBy, orderBy)
      if (result.length === 0) {
        return helperWrapper.response(res, 404, `Data not found`, []
        )
      }
      return helperWrapper.response(res, 200, "Success get data", result)
    } catch (err) {
      return helperWrapper.response(
        res, 400, `Bad request ${err.message}`, []
      )
    }
  },
  updateProfile: async (req, res) => {
    try {
      const { id } = req.params
      const idCheck = await Users.getUserById(id)
      if (!idCheck.length) {
        return helperWrapper.response(
          res, 404, `User not found!`, []
        )
      }
      let { first_name, last_name, phone_number } = req.body

      let setData = {
        ...req.body, updated_at: new Date(Date.now())
      }
      // console.log(setData)
      const result = await Users.updateProfile(setData, id)
      return helperWrapper.response(
        res, 200, 'success update profile', result)
    } catch (err) {
      return helperWrapper.response(
        res, 400, `Bad request (${err.message})`, []
      )
    }
  },
  updatePassword: async (req, res) => {
    try {
      const { id } = req.params
      const idCheck = await Users.getUserById(id)
      if (!idCheck.length) {
        return helperWrapper.response(
          res, 404, `User not found!`, []
        )
      }
      let { newPassword, confrimPassword } = req.body
      if (newPassword !== confrimPassword) {
        return helperWrapper.response(res, 400, 'New Password and Confrim Password must be same')
      }
      const password = await bcrypt.hash(newPassword, 10)
      // password = password
      const result = await Users.updatePassword(id, password)
      return helperWrapper.response(res, 200, 'Password changed', req.params)
    } catch (err) {
      return helperWrapper.response(res, 400, `Bad Request ${err.message}`, [])
    }
  },
  // updatePhoto: async (req, res) => {
  //   try {
  //     const { id } = req.params
  //     const idCheck = await Users.getUserById(id)

  //   } catch (err) {
  //     return helperWrapper.response(res, 400, `Bad Request ${err.message}`, [])

  //   }
  // }
}