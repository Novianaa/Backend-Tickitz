const db = require('../helpers/mysql')

module.exports = {
  getUsers: (keyword, sortBy, orderBy) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM users WHERE first_name LIKE '%${keyword}%' ORDER BY ${sortBy} ${orderBy}`, (err, result) => {
        if (err) {
          reject(new Error(`${err.sqlMessage}`))
        }
        resolve(result)
      })
    })
  },
  getUserById: (id) => {
    return new Promise((resolve, reject) => {
      const dbQuery = db.query(`SELECT * FROM users WHERE id=?`, id, (err, result) => {
        if (err) {
          reject(new Error(`${err.sqlMessage}`))
        }
        resolve(result)
      })
      // console.log(dbQuery.sql, 'jio')

    })
  },
  updateProfile: (setData, id) => {
    return new Promise((resolve, reject) => {
      const dbQuery = db.query(`UPDATE users SET ? WHERE id=?`, [setData, id], (err, result) => {
        if (err) {
          reject(new Error(`${err.sqlMessage}`))
        }
        resolve({
          id,
          ...setData,
        })
      })
      // console.log(dbQuery.sql)
    })
  },
  updatePassword: (id, password) => {
    return new Promise((resolve, reject) => {
      const dbQuery = db.query(`UPDATE users SET password = '${password}' WHERE id = '${id}'`, (err, result) => {
        if (err) {
          reject(new Error(`${err.sqlMessage}`))
        }
        resolve(result)
      })
      // console.log(dbQuery.sql)
    })
  },
  // updatePhoto:()=>{
  //   return new Promise((resolve, reject) => { 
  //     db.query(`UPDATE users SET photo=`)
  //    })
  // }
}