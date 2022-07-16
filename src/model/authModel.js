const db = require('../helpers/mysql')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

module.exports = {
  register: (first_name, last_name, email, phone_number, password) => {
    return new Promise((resolve, reject) => {
      bcrypt.hash(password, 10, (err, hashed) => {
        if (err) {
          reject(new Error(`${err.sqlMessage}`))
        } else {
          password = hashed
          console.log(password)
          const dbQuery = db.query(`INSERT INTO users(first_name, last_name, email, phone_number, password) VALUES('${first_name}', '${last_name}', '${email}', '${phone_number}','${password}')`, (err, result) => {
            if (err) {
              reject(new Error(`${err.sqlMessage}`))
            }
            resolve({
              first_name, last_name, email, phone_number, password

            })
          })
          // console.log(dbQuery.sql)
        }
      })
    })
  },
  login: (email, password) => {
    return new Promise((resolve, reject) => {
      const dbQuery = db.query(`SELECT id, email, password, role FROM users WHERE email='${email}'`, (err, result) => {
        // console.log(result, 'hdj')
        if (err) {
          reject(`${err.sqlMessage}`)
          // console.log(err)
        } else {
          bcrypt.compare(password, result[0].password, (errHashing, successHashing) => {
            if (errHashing) {
              console.log(errHashing)
              reject({ message: "Ada Masalah Saat Login, Harap coba lagi." })
            }
            if (successHashing) {
              const token = jwt.sign({ user_id: result[0].id, role: result[0].role }, process.env.JWT_SECRET_KEY, {
                expiresIn: '1 day'
              })
              resolve({

                token,
                user_id: result[0].id

              })
            } else {
              reject({ message: "Email/Password Salah." })
            }
          })
        }

      })
      // console.log(dbQuery.sql)
    })
  },
}
