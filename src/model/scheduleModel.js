const db = require('../helpers/mysql')

module.exports = {
  addNewSchedule: (setData) => {
    return new Promise((resolve, reject) => {
      db.query(`INSERT INTO schedule SET ?`, setData, (err, result) => {
        if (err) {
          reject(new Error(`${err.sqlMessage}`))
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
      db.query(`SELECT price FROM schedule WHERE id=?`, id, (err, result) => {
        if (err) {
          reject(new Error(`${err.sqlMessage}`))
        }
        resolve(result)
      })
    })
  },

  getScheduleById: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM schedule WHERE id=?`, id, (err, result) => {
        if (err) {
          reject(new Error(`${err.sqlMessage}`))
        }
        resolve(result)
      })
    })
  },
  countScheduleNow: (today) => {
    return new Promise((resolve, reject) => {
      const dbQuery = db.query(`SELECT COUNT(*) AS total FROM schedule WHERE (start_date <= '${today}%' AND end_date >= '${today}%')`, (err, result) => {
        if (err) {
          reject(new Error(`${err.sqlMessage}`))
        }
        resolve(result)
      })
      // console.log(dbQuery.sql)
    })
  },
  getScheduleNow: (today, keyword, orderBy, sortBy, limit, offset) => {
    return new Promise((resolve, reject) => {
      const dbQuery = db.query(`SELECT s.id, s.movie_id, m.title, s.cinema, p.county, s.start_date, s.end_date, s.time, s.price, m.cover, m.categories FROM schedule s LEFT OUTER JOIN movies m ON m.id=s.movie_id JOIN place AS p ON p.id=s.location WHERE start_date <= '${today}%' AND end_date >= '${today}%' AND title LIKE '%${keyword}%' ORDER BY ${orderBy} ${sortBy} LIMIT ? OFFSET ?`, [limit, offset], (err, result) => {
        if (err) {
          reject(new Error(`${err}`))
        }
        resolve(result)
      })
      console.log(dbQuery.sql)
    })
  },
  countScheduleComing: (upComing) => {
    return new Promise((resolve, reject) => {
      const dbQuery = db.query(`SELECT COUNT(*) AS total FROM schedule WHERE start_date <= '${upComing}%' AND end_date >= '${upComing}%'`, (err, result) => {
        if (err) {
          reject(new Error(`${err.sqlMessage}`))
        }
        resolve(result)
      })
      // console.log(dbQuery.sql)
    })
  },
  getScheduleUpComing: (upComing, keyword, orderBy, sortBy, limit, offset) => {
    return new Promise((resolve, reject) => {
      const dbQuery = db.query(`SELECT s.id,s.movie_id, m.title, s.cinema, p.county, s.start_date, s.end_date, s.time, s.price, m.cover, m.categories FROM schedule s LEFT OUTER JOIN movies m ON m.id=s.movie_id JOIN place AS p ON p.id=s.location WHERE start_date >= '${upComing}%' AND title LIKE '%${keyword}%' ORDER BY ${orderBy} ${sortBy} LIMIT ? OFFSET ?`, [limit, offset], (err, result) => {
        if (err) {
          reject(new Error(`${err.sqlMessage}`))
        }
        resolve(result)
      })
      console.log(dbQuery.sql)
    })
  },
  updateSchedule: (setData, id) => {
    return new Promise((resolve, reject) => {
      db.query(`UPDATE schedule SET ? WHERE id=?`, [setData, id], (err, result) => {
        if (err) {
          reject(new Error(`${err.sqlMessage}`))
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
          reject(new Error(`${err.sqlMessage}`))
        }
        resolve(`delete schedule id ${id}`)
      })
    })
  },
  countScheduleByMovieId: (movie_id, location, date) => {
    return new Promise((resolve, reject) => {
      const dbQuery = db.query(`SELECT COUNT(*) AS total FROM schedule WHERE movie_id=? AND location LIKE '%${location}%' AND start_date <= '${date}%' AND end_date >= '${date}%'`, movie_id, (err, result) => {
        if (err) {
          reject(new Error(`${err.message}`))
        }
        resolve(result)
      })
      // console.log(dbQuery.sql)
    })
  },
  getScheduleByMovieId: (movie_id, location, date) => {
    return new Promise((resolve, reject) => {
      const dbQuery = db.query(`SELECT s.id, m.title, s.cinema, p.county, s.start_date, s.end_date, s.time, s.price FROM schedule AS s JOIN movies AS m ON m.id=s.movie_id  JOIN place AS p ON p.id=s.location WHERE movie_id=? AND s.location= '${location}' AND start_date <= '${date}%' AND end_date >= '${date}%' ORDER BY start_date desc`, movie_id, (err, result) => {
        if (err) {
          reject(new Error(`${err.message}`))
        }
        resolve(result)
      })
      console.log(dbQuery.sql)
    })
  },

}
