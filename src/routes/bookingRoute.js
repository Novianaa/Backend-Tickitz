const express = require("express")
const router = express.Router()
const { postBooking, getBookingById, getBooking, updateBooking } = require('../controller/bookingController')


router.post('/', postBooking)
router.get('/', getBooking)
router.get('/:id', getBookingById)
router.patch('/:id', updateBooking)


module.exports = router