const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const employeeModels = require('./models/employeeModel');

const employeeRoutes = require('./routes/employeeRoutes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use('/employees', employeeRoutes);

module.exports = app;