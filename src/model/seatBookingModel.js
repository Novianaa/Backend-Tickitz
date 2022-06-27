const db = require('../helpers/mysql')

module.exports = {
  getSeatBooking: (movie_id, schedule_id, date, time) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT seat FROM seatBooking WHERE movie_id=${movie_id} AND schedule_id=${schedule_id} AND date=${date} AND time=${time}`, (err, result) => {
        if (err) {
          reject(new Error(`${err.message}`))
        }
        resolve(result)
      })
    })
  },
  postSeatBooking: (data) => {
    return new Promise((resolve, reject) => {
      const dbQuery = db.query('INSERT INTO booking_seat SET ?', data, (err, result) => {
        if (err) {
          reject(new Error(`${err.message}`))
        }
        resolve(result);
      })
      console.log(dbQuery.sql)
    })
  }
}