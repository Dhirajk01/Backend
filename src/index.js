// require('dotenv').config({path: './env'})

import dotenv from "dotenv";
// import mongoose from "mongoose";
// import { DB_NAME } from "./constants";
import connectDB from "./db/index.js";

dotenv.config({ path: "./.env" });

connectDB()
.then(()=>{
  application.listen(process.env.PORT || 8000, ()=>{
    console.log(`Server is running at port : ${process.env.PORT}`)
  })
})
.catch((err)=>{
  console.log("mongo db connection failed !!!",err)
})
















/* 
import express from "express";
const app = express()(async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
    app.on("error", (error) => {
      console.log("ERROR: ", error);
      throw err;
    });

    app.listen(process.env.PORT, () => {
      console.log(`app is listening on port ${Process.env.PORT}`);
    });
  } catch (error) {
    console.error("ERROR: ", error);
    throw err;
  }
})();
*/
