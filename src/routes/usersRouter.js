const express = require("express")
const router = express.Router()
const { getUsers, updateProfile, updatePassword } = require('../controller/usersController')
const middlewareUpload = require('../middleware/uploadCoverMovie')
const { isLogin, isAdmin } = require('../middleware/verifyAuth')

router.get('/', isAdmin, getUsers)
router.patch('/profile/:id', isLogin, updateProfile)
router.patch('/password/:id', isLogin, updatePassword)
// router.patch('/updatephoto/:id', updatePassword)


module.exports = router
