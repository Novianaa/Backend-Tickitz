const express = require("express")
const router = express.Router()
const { getMovies, addNewMovie, getMovieById, updateMovie, deleteMovie } = require('../controller/moviesController')
const middlewareUpload = require('../middleware/uploadCoverMovie')
const { isLogin, isAdmin } = require('../middleware/verifyAuth')

router.get('/', getMovies)
router.post('/', isLogin, isAdmin, middlewareUpload, addNewMovie)
router.get('/:id', isLogin, getMovieById)
router.patch('/:id', isLogin, isAdmin, middlewareUpload, updateMovie)
router.delete('/:id', isLogin, isAdmin, deleteMovie)


module.exports = router