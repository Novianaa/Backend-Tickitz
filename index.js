require('dotenv').config()
const express = require('express');
const morgan = require('morgan');
const bodyParser = require("body-parser");
const helmet = require('helmet');
const cors = require('cors');

const app = express()
const { port } = process.env
const port_db = port
const db = require('./src/helpers/mysql');
const router = require('./src/routes/index')

var corsOptions = {
  origin: ['http://localhost:3000', 'http://127.0.0.1:5500/'],
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions));
app.use(morgan('dev'));
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api/v1', router)
app.use('/api/v1/*', (req, res) => {
  res.status(404).send('URL not found!')
})

app.listen(port_db, () => {
  console.log(`Tickitz Backend listening on port ${port_db}`)
})