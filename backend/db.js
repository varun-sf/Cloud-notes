const mongoose = require("mongoose");
const dotenv = require('dotenv');
dotenv.config();
const mongoURI = process.env.MONGODB_URL

const connectTomongo = async()=>{
   await mongoose.connect(mongoURI)
   .then(()=>  console.log("Successfully connected  to mongodb"))
}


module.exports = connectTomongo;