const express = require("express")
const router = express.Router()
const { getMovies, addNewMovie, getMovieById, updateMovie, deleteMovie } = require('../controller/moviesController')

router.get('/', getMovies)
router.post('/', addNewMovie)
router.get('/:id', getMovieById)
router.patch('/:id', updateMovie)
router.delete('/:id', deleteMovie)


module.exports = router