const db = require('../helpers/mysql')

module.exports = {
  addNewSchedule: (setData) => {
    return new Promise((resolve, reject) => {
      db.query(`INSERT INTO schedule SET ?`, setData, (err, result) => {
        if (err) {
          reject(new Error(`${err.message}`))
        }
        resolve({
          id: result.insertId,
          ...setData,
        })
      })
    })
  },
  getPrice: (id) => {
    return new Promise((resolve, reject) => {
      const dbQuery = db.query(`SELECT price FROM schedule WHERE id=?`, id, (err, result) => {
        if (err) {
          reject(new Error(`${err.message}`))
        }
        resolve(result)
      })
      console.log(dbQuery.sql)
    })
  },
  getScheduleById: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM schedule WHERE id=?`, id, (err, result) => {
        if (err) {
          reject(new Error(`${err.message}`))
        }
        resolve(result)
      })
    })
  },
  updateSchedule: (setData, id) => {
    return new Promise((resolve, reject) => {
      db.query(`UPDATE schedule SET ? WHERE id=?`, [setData, id], (err, result) => {
        if (err) {
          reject(new Error(`${errmessage}`))
        }
        resolve({
          id,
          ...setData,
        })
      })
    })
  },
  deleteSchedule: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`DELETE FROM schedule WHERE id=?`, id, (err, result) => {
        if (err) {
          reject(new Error(`${err.message}`))
        }
        resolve(`id = ${id}`)
      })
    })
  },
  getScheduleByMovieId: (movie_id, location, date) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT s.id, m.title, s.cinema, p.county, s.date, s.time, s.price FROM schedule AS s JOIN movies AS m ON m.id=s.movie_id JOIN place AS p ON p.id=s.location WHERE movie_id=? AND location LIKE '%${location}%' AND date LIKE '%${date}%' ORDER BY date desc`, movie_id, (err, newResult) => {
        if (err) {
          reject(new Error(`${err.message}`))
        }
        resolve(newResult)
      })
    })
  },


}