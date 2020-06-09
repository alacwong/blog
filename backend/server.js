
const morgan = require('morgan');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true})) 
app.use(morgan('dev'));


const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true,  useUnifiedTopology: true});

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

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