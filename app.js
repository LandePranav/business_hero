const express = require('express');
const connectDB = require("./config/db");
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
require('dotenv').config();

const PORT = process.env.PORT || 5000 ;

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/task", taskRoutes);

app.listen(PORT, ()=>{
    console.log("Server is Running on port: ", PORT);
});

connectDB(); //Connection to mongoDB

app.get("/api/test", (req,res)=>{
    res.send("Server is Up and Running!");
});