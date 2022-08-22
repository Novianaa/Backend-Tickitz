const Schedule = require('../model/scheduleModel')
const helperWrapper = require('../helpers/wrapper')

module.exports = {
  addNewSchedule: async (req, res) => {
    try {
      const { movie_id, cinema, location, start_date, end_date, time, price } = req.body
      const setData = { movie_id, cinema, location, start_date, end_date, time, price }
      if (!setData) {
        return helperWrapper.response(
          res, 400, `All field must filled`, []
        )
      }
      const result = await Schedule.addNewSchedule(setData)
      return helperWrapper.response(res, 201, 'Success create new schedule', result)
    } catch (err) {
      return helperWrapper.response(
        res, 400, `Bad request ${err.message}`, []
      )
    }
  },
  getScheduleById: async (req, res) => {
    try {
      const { id } = req.params
      const result = await Schedule.getScheduleById(id)
      if (!result.length) {
        return helperWrapper.response(
          res, 404, `Data by id ${id} not found!`, [])
      }
      return helperWrapper.response(res, 200, "Success show details movie", result)
    } catch (err) {
      return helperWrapper.response(
        res, 400, `Bad request (${err.message})`, []
      )
    }
  },
  getScheduleNow: async (req, res) => {
    try {
      let { keyword = '', orderBy = '' || 'title', sortBy = '' || 'asc', page, limit } = req.query
      let today = new Date().toISOString().slice(0, 10)
      page = Number(page) || 1
      limit = Number(limit) || 100
      const offset = page * limit - limit
      let totalMovie = await Schedule.countScheduleNow(today)
      totalMovie = totalMovie[0].total
      const totalPage = Math.ceil(totalMovie / limit)

      let result = await Schedule.getScheduleNow(today, keyword, orderBy, sortBy, limit, offset)
      if (!result.length) {
        return helperWrapper.response(
          res, 404, `Schedule movie not found!`, [])
      }
      let totalRow = result.length
      const totalPage = Math.ceil(totalRow / limit)
      result = { result, totalRow, page, totalPage, totalMovie }
      return helperWrapper.response(res, 200, "Success show details movie", result)
    } catch (err) {
      return helperWrapper.response(
        res, 400, `Bad request (${err.message})`, []
      )
    }
  },
  getScheduleUpComing: async (req, res) => {
    try {
      let { keyword = '', orderBy = '' || 'title', sortBy = '' || 'asc', page, limit } = req.query
      let date = new Date()
      date.setDate(date.getDate())
      let upComing = date.toISOString().slice(0, 10)
      page = Number(page) || 1
      limit = Number(limit) || 100
      const offset = page * limit - limit
      let totalMovie = await Schedule.countScheduleComing(upComing)
      totalMovie = totalMovie[0].total
      let result = await Schedule.getScheduleUpComing(upComing, keyword, orderBy, sortBy, limit, offset)
      let totalRow = result.length
      const totalPage = Math.ceil(totalRow / limit)
      // console.log(totalPage, totalMovie)
      if (!result.length) {
        return helperWrapper.response(
          res, 404, `Schedule movie not found!`, [])
      }
      result = { result, totalRow, page, totalPage, totalMovie }
      return helperWrapper.response(res, 200, "Success show details movie", result)
    } catch (err) {
      return helperWrapper.response(
        res, 400, `Bad request (${err.message})`, []
      )
    }
  },

  updateSchedule: async (req, res) => {
    try {
      const { id } = req.params
      const idCheck = await Schedule.getScheduleById(id)
      if (!idCheck.length) {
        return helperWrapper.response(
          res, 404, `Schedule by id ${id} not found!`, []
        )
      }
      const { movie_id, cinema, location, start_date, end_date, time, price } = req.body

      const setData = { ...req.body, updated_at: new Date(Date.now()) }

      const result = await Schedule.updateSchedule(setData, id)
      return helperWrapper.response(res, 200, 'Success update schedule', result)
    } catch (err) {
      return helperWrapper.response(
        res, 400, `Bad request ${err.message}`, []
      )
    }
  },
  deleteSchedule: async (req, res) => {
    try {
      const { id } = req.params
      const idCheck = await Schedule.getScheduleById(id)
      if (!idCheck.length) {
        return helperWrapper.response(
          res, 404, `Schedule by id ${id} not found!`, []
        )
      }

      const result = await Schedule.deleteSchedule(id)
      return helperWrapper.response(res, 200, 'Success delete schedule', result)
    } catch (err) {
      return helperWrapper.response(
        res, 400, `Bad request ${err.message}`, []
      )
    }
  },
  getScheduleByMovieId: async (req, res) => {
    try {
      const { movie_id } = req.params
      const { location = '', date, page, limit } = req.query
      page = Number(page) || 1
      limit = Number(limit) || 100
      const offset = page * limit - limit
      let totalMovie = await Schedule.countScheduleByMovieId(movie_id, location, date)
      totalMovie = totalMovie[0].total
      const totalPage = Math.ceil(totalMovie / limit)
      let result = await Schedule.getScheduleByMovieId(movie_id, location, date)
      console.log(result, 'dsds')
      if (result.length === 0) {
        return helperWrapper.response(
          res, 404, `Data not found`, []
        )
      }
      let newResult = result.map((item) => {
        let data = {
          ...item,
          time: item.time.split(",")
        }
        return data
      })
      result = { newResult, page, totalMovie, totalPage }
      return helperWrapper.response(res, 200, "Success show details movie", result)

    } catch (err) {
      return helperWrapper.response(
        res, 400, `Bad request (${err.message})`, []
      )
    }
  },

}