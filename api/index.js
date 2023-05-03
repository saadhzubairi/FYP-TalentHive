const express = require('express');
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");

const jobRoute = require("./routes/jobs") 
const jobApplicationsRoute = require("./routes/jobApplications")
const hrmsRoute = require("./routes/hrms")
const authRoute = require("./routes/auth")
const candRoute = require("./routes/candidates")

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

app.use("/api/jobs" , jobRoute);
app.use("/api/jobApplications" , jobApplicationsRoute);
app.use("/api/hrms" , hrmsRoute);
app.use("/api/auth" , authRoute);
app.use("/api/candidate" , candRoute);

app.listen(8800, () => {
    console.log("[+] Backend Server is running on 8800.")
})