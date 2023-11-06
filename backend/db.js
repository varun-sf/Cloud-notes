const mongoose = require("mongoose");
const mongoURI = "mongodb+srv://tilkireddy:notebook@notebook-cluster.5qmzftz.mongodb.net/"

const connectTomongo = async()=>{
   await mongoose.connect(mongoURI)
   .then(()=> console.log("Successfully connected  to mongodb"))
}


module.exports = connectTomongo;