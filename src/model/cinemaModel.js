const db = require('../helpers/mysql')

module.exports = {
  addCinema: (setData) => {
    return new Promise((resolve, reject) => {
      const dbQuery = db.query('INSERT INTO cinema SET ?', setData, (err, result) => {
        if (err) {
          reject(new Error(`${err.message}`))
        }
        resolve({
          id: newResult.insertId,
          ...setData,
        })
      })
      console.log(dbQuery.sql)
    })
  }
}