const SeatBooking = require('../model/seatBookingModel')
const helperWrapper = require('../helpers/wrapper')

module.exports = {
  getSeatBooking: async (req, res) => {
    try {
      let { movie_id, schedule_id, date, time } = req.query
      const result = await SeatBooking.getSeatBooking(movie_id, schedule_id, date, time)
      return helperWrapper.response(res, 200, "Success get data", result)
    } catch (err) {
      return helperWrapper.response(
        res, 400, `Bad request (${err.message})`, []
      )
    }
  },

}