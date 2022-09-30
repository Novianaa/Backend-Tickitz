const express = require("express")
const router = express.Router()
const { getSeatBooking } = require('../controller/seatBookingController')
const { isLogin, isAdmin } = require('../middleware/verifyAuth')

router.get('/', isLogin, getSeatBooking)

module.exports = router
