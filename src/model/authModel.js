const db = require('../helpers/mysql')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

module.exports = {
  register: (first_name, last_name, email, phone_number, password) => {
    return new Promise((resolve, reject) => {
      bcrypt.hash(password, 10, (err, hashed) => {
        if (err) {
          reject(new Error(`${err.message}`))
        } else {
          password = hashed
          console.log(password)
          const dbQuery = db.query(`INSERT INTO users(first_name, last_name, email, phone_number, password) VALUES('${first_name}', '${last_name}', '${email}', '${phone_number}','${password}')`, (err, result) => {
            if (err) {
              reject(new Error(`${err.message}`))
            }
            resolve({
              first_name, last_name, email, phone_number, password

            })
          })
          console.log(dbQuery.sql)
        }
      })
    })
  },
  login: (email, password) => {
    return new Promise((resolve, reject) => {
      const dbQuery = db.query(`SELECT id, email, password, role, photo FROM users WHERE email='${email}'`, (err, result) => {
        if (err) {
          reject(new Error(`${err.message}`))
        }
        resolve(result)
      })
      console.log(dbQuery.sql)
    })
  },
}
