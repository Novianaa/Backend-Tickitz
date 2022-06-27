const Movies = require('../model/moviesModel')
const helperWrapper = require('../helpers/wrapper')

module.exports = {
  getMovies: async (req, res) => {
    try {
      let { keyword = '', field = '' || 'title', sort = '' || 'asc' } = req.query

      const result = await Movies.getMovies(keyword, field, sort)
      if (result.length === 0) {
        return helperWrapper.response(
          res, 404, `Data not found`, null
        )
      }
      const newResult = result.map((item) => {
        const data = {
          ...item,
          categories: item.categories.split(",")
        }
        return data
      })
      return helperWrapper.response(res, 200, "Success get data", newResult)
    } catch (err) {
      return helperWrapper.response(
        res, 400, `Bad request ${err.message}`, null
      )
    }
  },
  getMovieById: async (req, res) => {
    try {
      const { id } = req.params
      const result = await Movies.getMovieById(id)
      if (!result.length) {
        return helperWrapper.response(
          res, 404, `Data by id ${id} not found!`, null)
      }
      const newResult = result.map((item) => {
        const data = {
          ...item,
          categories: item.categories.split(",")
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
  addNewMovie: async (req, res) => {
    try {
      const { title, cover, release_date, director, synopsis, casts, duration, categories } = req.body
      const data = { title, cover, release_date, director, synopsis, casts, duration, categories }
      if (!title || !cover || !release_date || !director || !synopsis || !casts || !duration || !categories) {
        return helperWrapper.response(
          res, 400, `All field must filled`, null
        )
      }
      const result = await Movies.addNewMovie(data)
      return helperWrapper.response(res, 201, "Success create new movie", result)
    } catch (err) {
      return helperWrapper.response(
        res,
        400,
        `Bad request (${err.message})`,
        null
      )
    }
  },
  updateMovie: async (req, res) => {
    try {
      let { id } = req.params
      const idCheck = await Movies.getMovieById(id)
      if (!idCheck.length) {
        return helperWrapper.response(
          res, 404, `Movie by id ${id} not found!`, null
        )
      }
      const { title, cover, release_date, director, synopsis, casts, duration, categories } = req.body
      if (!title || !cover || !release_date || !director || !synopsis || !casts || !duration || !categories) {
        return helperWrapper.response(
          res, 400, `All field must filled`, null
        )
      }
      let setData = {
        title, cover, release_date, director, synopsis, casts, duration, categories, updated_at: new Date(Date.now())
      }
      const result = await Movies.updateMovie(setData, id)
      return helperWrapper.response(
        res, 200, `Success update movie`, result
      )
    } catch (err) {
      return helperWrapper.response(
        res, 400, `Bad request (${err.message})`, null
      )
    }
  },
  deleteMovie: async (req, res) => {
    try {
      const { id } = req.params
      const idCheck = await Movies.getMovieById(id)
      if (!idCheck.length) {
        return helperWrapper.response(
          res, 404, `Movie by id ${id} not found!`, null
        )
      }
      const result = await Movies.deleteMovie(id)
      return helperWrapper.response(
        res, 200, `Success delete movie`, result
      )
    } catch (err) {
      return helperWrapper.response(
        res, 400, `Bad request (${err.message})`, null
      )
    }
  }
}