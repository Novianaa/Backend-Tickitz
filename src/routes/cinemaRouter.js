const express = require("express")
const router = express.Router()
const { isLogin, isAdmin } = require('../middleware/verifyAuth')
const { addCinema } = require('../controller/cinemaController')
const middlewareUpload = require('../middleware/uploadImage')

router.post('/', isLogin, isAdmin, middlewareUpload, addCinema)

module.exports = router
