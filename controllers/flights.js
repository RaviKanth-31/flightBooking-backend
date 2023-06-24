import Flight from "../models/Flight.js";
import Seat from "../models/Seat.js";
export const createFlight = async (req, res)=>{
    const newFlight = new Flight(req.body)
    try{
        const savedFlight = await newFlight.save()
        res.status(200).json(savedFlight)
    }
    catch(error){
        res.status(500).json(error)
    }
}
export const updateFlight =  async (req, res)=>{
    
    try{
        const updatedFlight = await Flight.findByIdAndUpdate(req.params.id, {$set: req.body}, {$new: true})
        res.status(200).json(updatedFlight)
    }
    catch(error){
        res.status(500).json(error)
    }
}
export const deleteFlight = async (req, res)=>{
    
    try{
        await Flight.findByIdAndDelete(req.params.id)
        res.status(200).json("Flight deleted")
    }
    catch(error){
        res.status(500).json(error)
    }
}
export const getFlight = async (req, res)=>{
    
    try{
        const flights = await Flight.findById(req.params.id)
        console.log(flights.dateOfTravel)
        res.status(200).json(flights)
    }
    catch(error){
        res.status(500).json(error)
    }
}
export const getAllFlights = async (req, res)=>{
    
    try{
        const flights = await Flight.find()
        res.status(200).json(flights)
    }
    catch(error){
        res.status(500).json(error)
    }
}
export const countByFlights = async (req, res, next)=>{
    try{
        const flightCount = await Flight.countDocuments({arrivalCity:req.query.arrivalCity, departureCity:req.query.departureCity})
        res.status(200).json(flightCount)
    }catch(err){
        next(err)
    }
}
export const searchFlight = async (req, res, next)=>{
    try{
        const flights = await Flight.find({ arrivalCity: req.query.arrivalCity, departureCity:req.query.departureCity})
        res.status(200).json(flights)
    }catch(err){
        next(err)
    }
}
export const getFlightSeats = async (req, res, next)=>{
    try{
        const flight = await Flight.findById(req.params.id);
        const list = await Promise.all(flight.seats.map((seat)=>{
            return Seat.findById(seat)
        }))
        res.status(200).json(list)
    }catch(err){
        next(err)
    }
}
export const changeSeatAvailability = async (req, res, next)=>{
    try{
        const flight = await Flight.findById({_id:req.params.id})
        console.log(flight.available)
        flight.available -= 1;

        // Save the updated flight document
        await flight.save();
        console.log(flight.available)
    }catch(err){
        next(err)
    }
}