const express = require('express');
const connectDB = require("./config/db");
const cors = require('cors');
const cookieParser = require('cookie-parser');

require('dotenv').config();

const PORT = process.env.PORT || 5000 ;

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.listen(PORT, ()=>{
    console.log("Server is Running on port: ", PORT);
});

connectDB(); //Connection to mongoDB

