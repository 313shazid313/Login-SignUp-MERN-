const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");

mongoose
    .connect(process.env.URL)
    .then(()=>{
        console.log('connected to database');
    })
    .catch((error)=>{
        console.log(error);
        process.exit(1);
    })