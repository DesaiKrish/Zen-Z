//request('dotenv').config({path: './env'})
import dotenv from "dotenv"
import connectDB from "./db/db.js";
import { Error } from "mongoose";
import { app } from './app.js'

dotenv.config({
    path:'./env'    
})

connectDB()
.then(() => {
    app.on("error", (error) => {
        console.log("Error: ",error);
        throw error
    })
    
    app.listen(5000, () => {
        console.log(`Server is running at port: ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("Mongodb connection failed!", err);
})