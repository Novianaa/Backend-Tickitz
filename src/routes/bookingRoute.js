const express = require("express")
const router = express.Router()
const { postBooking, getBookingById, getBooking, updateBooking } = require('../controller/bookingController')
const { isLogin, isAdmin } = require('../middleware/verifyAuth')

router.post('/', isLogin, postBooking)
router.get('/', isLogin, isAdmin, getBooking)
router.get('/:id', isLogin, getBookingById)
router.patch('/:id', isLogin, updateBooking)


module.exports = router