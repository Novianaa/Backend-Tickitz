const express = require("express");
const app = express()
const moviesRoute = require('./moviesRoute')
const scheduleRoute = require('./scheduleRoute')
const bookingRoute = require('./bookingRoute')

app.use('/movies', moviesRoute)
app.use('/schedule', scheduleRoute)
app.use('/booking', bookingRoute)

module.exports = app