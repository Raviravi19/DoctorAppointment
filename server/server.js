const express = require('express');
const colors = require('colors');
const morgan = require('morgan');
const dotenv = require('dotenv');
//const mongoose=require('mongoose');
const connectDB = require('./config/db');
const cors=require('cors')



dotenv.config();

const mongoose = require('mongoose');
const connectionString ="mongodb://ravi:1234@ac-k4otrkw-shard-00-00.g6y9elv.mongodb.net:27017,ac-k4otrkw-shard-00-01.g6y9elv.mongodb.net:27017,ac-k4otrkw-shard-00-02.g6y9elv.mongodb.net:27017/?ssl=true&replicaSet=atlas-9jjqp4-shard-0&authSource=admin&retryWrites=true&w=majority";
mongoose.set("strictQuery",false)
async function connectToDatabase() {
  try {
    await mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to the database');
    // Continue with your application logic
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
}


connectToDatabase();

//dotenv.config({path: './config.env'})
const app = express()

//middlewares
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

//routes

app.use("/api/v1/user", require("./routes/userRoutes"));
app.use("/api/v1/admin", require("./routes/adminRoutes"));
app.use("/api/v1/doctor",require("./routes/doctorRoutes"));

const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log(
        port
        );
});
