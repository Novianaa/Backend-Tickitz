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
      // const pageInfo = {
      //   page, totalPage, totalMovie
      // }

      const resultMovie = await Movies.getMovies(keyword, orderBy, sortBy, limit, offset)
      if (resultMovie.length === 0) {
        return helperWrapper.response(
          res, 404, `Data not found`, []
        )
      }
      const totalRow = resultMovie.length
      const totalPage = Math.ceil(totalRow / limit)

      let result = resultMovie.map((item) => {
        const data = {
          ...item,
          categories: item.categories.split(",")
        }
        return data
      })
      result = { result, totalRow, page, totalPage, totalMovie }
      return helperWrapper.response(res, 200, "Success get data", result)
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
      let { title, release_date, director, synopsis, casts, duration, categories } = req.body
      // const photoDefault = 'http://bppl.kkp.go.id/uploads/publikasi/karya_tulis_ilmiah/default.jpg'
      let cover = req.file ? req.file.filename : 'http://bppl.kkp.go.id/uploads/publikasi/karya_tulis_ilmiah/default.jpg'
      // console.log(req.file, 'klkl')

      if (!title || !cover || !release_date || !director || !synopsis || !casts || !duration || !categories) {
        return helperWrapper.response(
          res, 400, `All field must filled`, null
        )
      }
      const data = { title, cover, release_date, director, synopsis, casts, duration, categories }
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
      let { title, release_date, director, synopsis, casts, duration, categories } = req.body
      let cover = req.file ? req.file.filename : idCheck[0].cover
      if (!title && !release_date && !director && !synopsis && !casts && !duration && !categories && cover === idCheck[0].cover) {
        return helperWrapper.response(res, 400, `nothing updated`, null)
      }
      let setData = {
        ...req.body, cover, updated_at: new Date(Date.now())
      }
      if (setData.cover !== idCheck[0].cover) {
        fs.unlink(`public/upload/movie/${idCheck[0].cover}`, (err) => {
          if (err) { res, 400, `Error delete file`, null }
        })
      }
      console.log(cover)
      const result = await Movies.updateMovie(setData, id)
      // console.log(result)

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
      return helperWrapper.response(res, 400, `Bad request (${err.message})`, null)
    }
  }
}