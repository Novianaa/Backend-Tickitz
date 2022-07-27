const db = require('../helpers/mysql')


module.exports = {
  getMovies: (keyword, orderBy, sortBy, limit, offset) => {
    return new Promise((resolve, reject) => {
      const dbQuery = db.query(`SELECT * FROM movies WHERE title LIKE '%${keyword}%' ORDER BY ${orderBy} ${sortBy} LIMIT ? OFFSET ?`, [limit, offset], (err, newResult) => {
        if (err) {
          reject(new Error(`${err.sqlMessage}`))
        }
        resolve(newResult)
      })
      console.log(dbQuery.sql, 'hjkh')
    })
  },
  countMovie: () => {
    return new Promise((resolve, reject) => {
      const dbQuery = db.query(`SELECT COUNT(*) AS total FROM movies`, (err, newResult) => {
        if (err) {
          reject(new Error(`${err.sqlMessage}`))
        }
        resolve(newResult)
      })
      // console.log(dbQuery.sql)
    })
  },
  getMovieById: (id) => {
    return new Promise((resolve, reject) => {
      const dbQuery = db.query(`SELECT * FROM movies WHERE id=?`, id, (err, newResult) => {
        if (err) {
          reject(new Error(`${err.sqlMessage}`))
        }
        resolve(newResult)
      })
      // console.log(dbQuery.sql)
    })
  },
  addNewMovie: (data) => {
    return new Promise((resolve, reject) => {
      const dbQuery = db.query(`INSERT INTO movies SET ?`, data, (err, result) => {
        if (err) {
          reject(new Error(`${err.sqlMessage}`))
        }
        resolve({
          id: result.insertId,
          ...data,

        })
      })
      // console.log(dbQuery.sql)
    })
  },
  updateMovie: (data, id) => {
    return new Promise((resolve, reject) => {
      const dbQuery = db.query(`UPDATE movies SET ? WHERE id = ?`, [data, id], (err) => {
        if (err) {
          reject(new Error(`${err.sqlMessage}`))
        }
        resolve({
          id,
          ...data,
        })
      })
      // console.log(dbQuery.sql)
    })
  },
  deleteMovie: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`DELETE FROM movies WHERE id=?`, id, (err) => {
        if (err) {
          reject(new Error(`${err.sqlMessage}`))
        }
        resolve(`Delete movie by id ${id}`)
      })
    })
  }
}