const Booking = require('../model/bookingModel')
const SeatBooking = require('../model/seatBookingModel')
const Schedule = require('../model/scheduleModel')
const helperWrapper = require('../helpers/wrapper')

module.exports = {
  postBooking: async (req, res) => {
    try {
      const { user_id, movie_id, date, time, schedule_id, total_payment, payment_method, status_payment, seat } = req.body
      const checkPrice = await Schedule.getPrice(schedule_id)
      // let seatArry = seat.split(',')
      let setData = {
        user_id: req.decodeToken.user_id, movie_id, date, time, schedule_id, total_ticket: seat.length, total_payment: checkPrice[0].price * seat.length, payment_method: 'NULL', status_payment: 'Pending'
      }
      // total_payment = checkPrice[0].price * setData.total_ticket
      const result = await Booking.postBooking(setData)
      let y = await seat.map((x) => {
        const setDataSeatBooking = {
          booking_id: result.id,
          schedule_id,
          movie_id,
          date,
          time,
          seat: x,
        }
        SeatBooking.postSeatBooking(setDataSeatBooking)
      })
      const newResult = { id: result.id, ...setData, seat: seat }
      // console.log('hahaha', newResult)
      return helperWrapper.response(res, 201, 'Success create booking', newResult)
    } catch (err) {
      return helperWrapper.response(
        res, 400, `Bad request ${err.message}`, []
      )
    }
  },
  getBooking: async (req, res) => {
    try {
      const result = await Booking.getBooking()
      return helperWrapper.response(res, 200, 'Success get booking', result)
    } catch (err) {
      return helperWrapper.response(
        res, 400, `Bad request ${err.message}`, []
      )
    }
  },
  getBookingById: async (req, res) => {
    try {
      const { id } = req.params
      let result = await Booking.getBookingById(id)
      let newResult = result[0];
      let newSeat = [];
      result.map((item) => {
        let { seat } = item;
        newSeat = [...newSeat, seat];
      });
      result = { ...newResult, seat: newSeat }
      return helperWrapper.response(res, 200, 'Success get booking byid', result)
    } catch (err) {
      return helperWrapper.response(
        res, 400, `Bad request ${err.message}`, []
      )
    }
  },
  updateBooking: async (req, res) => {
    try {
      let { id } = req.params
      const idCheck = await Booking.getBookingById(id)
      if (!idCheck.length) {
        return helperWrapper.response(
          res, 404, `Booking by id ${id} not found!`, []
        )
      }
      const { payment_method, status_payment } = req.body
      let setData = {
        ...req.body, user_id: req.decodeToken.user_id, updated_at: new Date(Date.now())
      }
      const result = await Booking.updateBooking(setData, id)
      return helperWrapper.response(
        res, 200, `Success update movie`, result
      )
    } catch (err) {
      return helperWrapper.response(
        res, 400, `Bad request (${err.message})`, []
      )
    }
  }
}

