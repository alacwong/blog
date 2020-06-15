
const morgan = require('morgan');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const mongoUtil = require('./mongoUtil');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true})) 
app.use(morgan('dev'));


mongoUtil.connect();

const userRouter = require('./routes/User');
const blogRouter = require('./routes/Blogger');
const getRouter = require('./routes/Get');
const saveRouter = require('./routes/Save');

app.use("", userRouter);
app.use("/blogger", blogRouter);
app.use("/get", getRouter);
app.use('/save', saveRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});