const Schedule = require('../model/scheduleModel')
const helperWrapper = require('../helpers/wrapper')

module.exports = {
  addNewSchedule: async (req, res) => {
    try {
      const { movie_id, cinema, location, date, time, price } = req.body
      const setData = { movie_id, cinema, location, date, time, price }
      if (!setData) {
        return helperWrapper.response(
          res, 400, `All field must filled`, null
        )
      }

      const result = await Schedule.addNewSchedule(setData)
      return helperWrapper.response(res, 201, 'Success create new schedule', result)
    } catch (err) {
      return helperWrapper.response(
        res, 400, `Bad request ${err.message}`, null
      )
    }
  },
  getScheduleById: async (req, res) => {
    try {
      const { id } = req.params
      const result = await Schedule.getScheduleById(id)
      if (!result.length) {
        return helperWrapper.response(
          res, 404, `Data by id ${id} not found!`, null)
      }
      return helperWrapper.response(res, 200, "Success show details movie", result)
    } catch (err) {
      return helperWrapper.response(
        res, 400, `Bad request (${err.message})`, null
      )
    }
  },

  updateSchedule: async (req, res) => {
    try {
      const { id } = req.params
      const idCheck = await Schedule.getScheduleById(id)
      if (!idCheck.length) {
        return helperWrapper.response(
          res, 404, `Schedule by id ${id} not found!`, null
        )
      }
      const { movie_id, cinema, location, date, time, price } = req.body
      if (!movie_id || !cinema || !location || !date || !time || !price) {
        return helperWrapper.response(
          res, 400, `All field must filled`, null
        )
      }
      const setData = { movie_id, cinema, location, date, time, price, updated_at: new Date(Date.now()) }

      const result = await Schedule.updateSchedule(setData, id)
      return helperWrapper.response(res, 200, 'Success update schedule', result)
    } catch (err) {
      return helperWrapper.response(
        res, 400, `Bad request ${err.message}`, null
      )
    }
  },
  deleteSchedule: async (req, res) => {
    try {
      const { id } = req.params
      const idCheck = await Schedule.getScheduleById(id)
      if (!idCheck.length) {
        return helperWrapper.response(
          res, 404, `Schedule by id ${id} not found!`, null
        )
      }

      const result = await Schedule.deleteSchedule(id)
      return helperWrapper.response(res, 200, 'Success delete schedule', result)
    } catch (err) {
      return helperWrapper.response(
        res, 400, `Bad request ${err.message}`, null
      )
    }
  },
  getScheduleByMovieId: async (req, res) => {
    try {
      const { movie_id } = req.params
      let { location = '', date = '' } = req.query
      const result = await Schedule.getScheduleByMovieId(movie_id, location, date)
      if (result.length === 0) {
        return helperWrapper.response(
          res, 404, `Data not found`, null
        )
      }
      const newResult = result.map((item) => {
        const data = {
          ...item,
          time: item.time.split(",")
        }
        return data
      })
      return helperWrapper.response(res, 200, "Success show details movie", newResult)

    } catch (err) {
      return helperWrapper.response(
        res, 400, `Bad request (${err.message})`, null
      )
    }
  },

}