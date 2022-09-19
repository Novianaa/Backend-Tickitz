const db = require('../helpers/mysql')

module.exports = {

  postBooking: (setData) => {
    return new Promise((resolve, reject) => {
      const dbQuery = db.query(`INSERT INTO booking SET ?`, setData, (err, newResult) => {
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
  },
  getBooking: () => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT *, bs.seat FROM booking AS b JOIN booking_seat AS bs ON b.id=bs.booking_id`, (err, result) => {
        if (err) {
          reject(new Error(`${err.message}`))
        }
        resolve(result)
      })
    })
  },
  getBookingById: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT b.id, b.user_id, b.date, b.time, b.movie_id, b.schedule_id, b.total_ticket, b.total_payment, b.payment_method, b.status_payment, bs.seat FROM booking b JOIN booking_seat bs ON b.id = bs.booking_id WHERE b.id = ?`, id, (err, result) => {
        if (err) {
          reject(new Error(`${err.message}`))
        }
        resolve(result)
      })
    })
  },
  updateBooking: (setData, id) => {
    return new Promise((resolve, reject) => {
      db.query(`UPDATE booking SET ? WHERE id = ?`, [setData, id], (err) => {
        if (err) {
          reject(new Error(`${err.message}`))
        }
        resolve({

          id,
          ...setData,

        })
      })
    })
  },
}