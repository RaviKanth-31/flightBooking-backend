import Seat from "../models/Seat.js";
import Flight from "../models/Flight.js";
import User from "../models/User.js";

export const createSeat = async (req, res, next)=>{
    const flightId = req.params.flightid;
    const newSeat = new Seat(req.body);
    try{
        const savedSeat = await newSeat.save();
        try{
            await Flight.findByIdAndUpdate(flightId, {
                $push : {seats: savedSeat._id}}
                );
            }catch(err){
                next(err);
            }
            res.status(200).json(savedSeat);
    }catch(err){
        next(err)
    }
};


export const updateSeat =  async (req, res)=>{
    
    try{
        const updatedSeat = await Seat.findByIdAndUpdate(req.params.id, {$set: req.body}, {$new: true})
        res.status(200).json(updatedSeat)
    }
    catch(error){
        res.status(500).json(error)
    }
}
export const deleteSeat = async (req, res)=>{
    
    try{
        await Seat.findByIdAndDelete(req.params.id)
        res.status(200).json("Seat deleted")
    }
    catch(error){
        res.status(500).json(error)
    }
}
export const getSeat = async (req, res)=>{
    
    try{
        const seats = await Seat.findById(req.params.id)
        res.status(200).json(seats)
    }
    catch(error){
        res.status(500).json(error)
    }
}
export const getAllSeats = async (req, res)=>{
    
    try{
        const seats = await Seat.find()
        res.status(200).json(seats)
    }
    catch(error){
        res.status(500).json(error)
    }
}
export const changeSeatAvailability = async (req, res)=>{
    try{
        await Seat.updateOne({"seatNumbers._id": req.params.id},{
            $set:{
                "seatNumbers.$.booked":true
            }
        })
        res.status.send(200)
    }catch(err){
        res.status(500).json(err)
    }
}

