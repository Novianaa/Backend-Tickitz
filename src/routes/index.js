const express = require("express");
const app = express()
const moviesRoute = require('./moviesRoute')
const scheduleRoute = require('./scheduleRoute')
const bookingRoute = require('./bookingRoute')
const authRouter = require('./authRouter')
const usersRouter = require('./usersRouter')
const cinemaRouter = require('./cinemaRouter')
const { isLogin, isAdmin } = require('../middleware/verifyAuth')

app.use('/auth', authRouter)
app.use('/movies', moviesRoute)
app.use('/cinema', isLogin, isAdmin, cinemaRouter)
app.use('/schedule', scheduleRoute)
app.use('/booking', bookingRoute)
app.use('/users', isLogin, usersRouter)

module.exports = app