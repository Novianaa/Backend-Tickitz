const db = require('../helpers/mysql')


module.exports = {
  getMovies: (keyword, field, sort) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM movies WHERE title LIKE '%${keyword}%' ORDER BY ${field} ${sort}`, (err, newResult) => {
        if (err) {
          reject(new Error(`${err.message}`))
        }
        resolve(newResult)
      })
    })
  },
  getMovieById: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM movies WHERE id=?`, id, (err, newResult) => {
        if (err) {
          reject(new Error(`${err.message}`))
        }
        resolve(newResult)
      })
    })
  },
  addNewMovie: (data) => {
    return new Promise((resolve, reject) => {

      db.query(`INSERT INTO movies SET ?`, data, (err, result) => {
        if (err) {
          reject(new Error(`${err.message}`))
        }
        resolve({
          id: result.insertId,
          ...data,

        })
      })
    })
  },
  updateMovie: (data, id) => {
    return new Promise((resolve, reject) => {
      db.query(`UPDATE movies SET ? WHERE id = ?`, [data, id], (err) => {
        if (err) {
          reject(new Error(`${err.message}`))
        }
        resolve({

          id,
          ...data,

        })
      })
    })
  },
  deleteMovie: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`DELETE FROM movies WHERE id=?`, id, (err) => {
        if (err) {
          reject(new Error(`${err.message}`))
        }
        resolve(`id = ${id}`)
      })
    })
  }
}