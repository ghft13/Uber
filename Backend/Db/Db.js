const mongoose = require("mongoose");

function connectDb() {
  mongoose
    .connect(process.env.mongodb_url, {
     
    })
    .then(() => {
      console.log("Connected to database");
    })
    .catch((err) => {
      console.error("Database connection error:", err);
      process.exit(1); // Exit on DB connection failure
    });
}

module.exports = connectDb;
