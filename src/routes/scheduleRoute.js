const express = require("express")
const router = express.Router()
const { getScheduleByMovieId, getScheduleById, addNewSchedule, updateSchedule, deleteSchedule, getScheduleNow, getScheduleUpComing } = require('../controller/scheduleController')
const { isLogin, isAdmin } = require('../middleware/verifyAuth')

router.post('/', isLogin, isAdmin, addNewSchedule)
router.get('/now', getScheduleNow)
router.get('/upcoming', getScheduleUpComing)
router.get('/:id', isLogin, getScheduleById)
router.delete('/:id', isLogin, isAdmin, deleteSchedule)
router.patch('/:id', isLogin, isAdmin, updateSchedule)
router.get('/movie/:movie_id', isLogin, getScheduleByMovieId)

module.exports = router
