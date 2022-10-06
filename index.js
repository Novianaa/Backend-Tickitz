require('dotenv').config()
const express = require('express');
const morgan = require('morgan');
const bodyParser = require("body-parser");
const helmet = require('helmet');
const cors = require('cors');
const path = require('path')

const app = express()
const PORT = process.env.PORT || 5000
// const PORT = port
const db = require('./src/helpers/mysql');
const router = require('./src/routes/index')

var corsOptions = {
  origin: ['http://localhost:3000', 'http://localhost:3001', 'https://backend-tickitz.herokuapp.com', 'https://tickitz-fe-novianaa.vercel.app'],
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions));
app.use(morgan('dev'));
app.use(helmet({
  crossOriginResourcePolicy: false,
}));
//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: false }));
// support parsing of application/json type post data
app.use(bodyParser.json());
// app.use('/static', express.static('public'))
app.use('/static', express.static(path.join(__dirname, 'public/upload/movie')));
app.use('/api/v1', router)
app.use('/api/v1/*', (req, res) => {
  res.status(404).send('URL not found!')
})

app.listen(PORT, () => {
  console.log(`Tickitz Backend listening on port ${PORT}`)
})