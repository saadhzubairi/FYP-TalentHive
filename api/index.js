const express = require('express');
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");

const app = express();
dotenv.config();

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true })
    .then(() => console.log("[+] Connected to MongoDB"))
    .catch((err) => console.log(err));

//Middleware:
app.use(express.json()) //this is a body parser for post requests and stuff
app.use(helmet())
app.use(morgan("common"))

app.get("/",(req,res)=>{
    res.send("Welcome to homepage!")
})

app.listen(8800, () => {
    console.log("[+] Backend Server is running on 8800.")
})
