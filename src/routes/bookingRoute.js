const express = require("express")
const router = express.Router()
const { postBooking, getBookingById, getBooking } = require('../controller/bookingController')


router.post('/', postBooking)
router.get('/', getBooking)
router.get('/:id', getBookingById)


module.exports = router