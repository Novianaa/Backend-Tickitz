const db = require('../helpers/mysql')

module.exports = {
  addCinema: (data) => {
    return new Promise((resolve, reject) => {
      const dbQuery = db.query('INSERT INTO cinema SET ?', data, (err, result) => {
        if (err) {
          reject(new Error(`${err.sqlMessage}`))
        }
        resolve({
          id: result.insertId,
          ...data,
        })
      })
      console.log(dbQuery.sql)
    })
  }
}