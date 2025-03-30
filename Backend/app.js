require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDb = require("./Db/Db");
const userRoutes=require('./Routes/user.routes')
const app = express();

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended:true}))
connectDb();

app.get("/", (req, res) => {
  res.send("Hello");
});

app.use("/user",userRoutes)
 
module.exports = app;
