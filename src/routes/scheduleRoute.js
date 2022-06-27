const express = require("express")
const router = express.Router()
const { getScheduleByMovieId, getScheduleById, addNewSchedule, updateSchedule, deleteSchedule } = require('../controller/scheduleController')

router.post('/', addNewSchedule)
router.get('/:id', getScheduleById)
router.delete('/:id', deleteSchedule)
router.patch('/:id', updateSchedule)
router.get('/movie/:movie_id', getScheduleByMovieId)

module.exports = router
