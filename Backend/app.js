require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDb = require("./Db/Db");
const userRoutes=require('./Routes/user.routes')
const cookieparser=require("cookie-parser")
const app = express();

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieparser())
connectDb();

app.get("/", (req, res) => {
  res.send("Hello");
});

app.use("/user",userRoutes)
 
module.exports = app;
