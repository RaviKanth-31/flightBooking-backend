import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js"
import flightRoute from "./routes/flights.js"
import userRoute from "./routes/users.js"
import seatRoute from "./routes/seats.js"
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express()
dotenv.config();

const connect = async () =>{
    try{
        await mongoose.connect(process.env.MONGO)
        console.log("Connected to Server")
    }
    catch(error){
        throw(error)
    }
}

mongoose.connection.on("disconnected", ()=>{
    console.log("Server Disconnected");
})

mongoose.connection.on("connected", ()=>{
    console.log("Server Connected");
})


//middlewares
app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use("/auth", authRoute)
app.use("/flights", flightRoute)
app.use("/users", userRoute)
app.use("/seats", seatRoute)

app.listen(8089, ()=>{
    connect()
    console.log("Connected to backend")
})