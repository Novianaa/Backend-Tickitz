const SeatBooking = require('../model/seatBookingModel')
const helperWrapper = require('../helpers/wrapper')

module.exports = {
  getSeatBooking: async (req, res) => {
    try {
      let { movie_id, schedule_id, date, time } = req.query
      let result = await SeatBooking.getSeatBooking(movie_id, schedule_id, date, time)
      let newSeat = []
      result.map((x) => {
        let { seat } = x
        newSeat = [...newSeat, seat]
      })
      // console.log(newSeat)
      return helperWrapper.response(res, 200, "Success get data", newSeat)
    } catch (err) {
      return helperWrapper.response(
        res, 400, `Bad request (${err.message})`, []
      )
    }
  },

}