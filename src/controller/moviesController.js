const fs = require('fs');
const Movies = require('../model/moviesModel')
const helperWrapper = require('../helpers/wrapper')

module.exports = {
  getMovies: async (req, res) => {
    try {
      let { keyword = '', orderBy = '' || 'title', sortBy = '' || 'asc', page, limit } = req.query
      page = Number(page) || 1
      limit = Number(limit) || 100
      const offset = page * limit - limit
      let totalMovie = await Movies.countMovie()
      totalMovie = totalMovie[0].total
      const totalPage = Math.ceil(totalMovie / limit)
      const pageInfo = {
        page, totalPage, totalMovie
      }

      const result = await Movies.getMovies(keyword, orderBy, sortBy, limit, offset)
      if (result.length === 0) {
        return helperWrapper.response(
          res, 404, `Data not found`, []
        )
      }
      const newResult = result.map((item) => {
        const data = {
          ...item,
          categories: item.categories.split(",")
        }
        return data
      })
      return helperWrapper.response(res, 200, "Success get data", { result: newResult, pagination: pageInfo })
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
      const { title, release_date, director, synopsis, casts, duration, categories } = req.body
      const cover = req.file ? req.file.filename : 'http://bppl.kkp.go.id/uploads/publikasi/karya_tulis_ilmiah/default.jpg'
      console.log(req.file)
      const data = { title, cover, release_date, director, synopsis, casts, duration, categories }
      if (!data) {
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
      let { title, cover, release_date, director, synopsis, casts, duration, categories } = req.body
      cover = req.file ? req.file.filename : null
      let setData = {
        ...req.body, cover, updated_at: new Date(Date.now())
      }
      if (cover && idCheck[0].cover) {
        fs.unlink(`public/upload/movie/${idCheck[0].cover}`, (err) => {
          if (err) { res, 400, `Error delete file`, null }
        })
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
      fs.unlink(`public/upload/movie/${idCheck[0].cover}`, (err) => {
        if (err) { res, 400, `Error delete file`, null }
      })
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