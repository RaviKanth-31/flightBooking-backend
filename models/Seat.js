import mongoose from "mongoose";

const SeatSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    seatNumbers: [{number:Number, booked:Boolean}]
});

export default mongoose.model("Seat", SeatSchema);