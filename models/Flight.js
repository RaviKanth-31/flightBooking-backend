import { time } from "console";
import mongoose from "mongoose";

const FlightSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    airline:{
        type: String,
        required: true
    },
    departureCity:{
        type: String,
        required: true
    },
    arrivalCity:{
        type: String,
        required: true
    },
    dateOfTravel:{
        type: Date,
        required: true
    },
    seats:{
        type: [String]
    },
    available:{
        type: Number,
        required: true,
        min: 0,
        max: 60
    },
    price:{
        type: Number,
        required: true
    },
    time:{
        type: Number,
        required: true
    }
});

export default mongoose.model("Flight", FlightSchema);