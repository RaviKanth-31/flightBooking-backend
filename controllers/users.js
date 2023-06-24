import Flight from "../models/Flight.js";
import User from "../models/User.js";
export const createUser = async (req, res)=>{
    const newUser = new User(req.body)
    try{
        const savedUser = await newUser.save()
        res.status(200).json(savedUser)
    }
    catch(error){
        res.status(500).json(error)
    }
}
export const updateUser =  async (req, res)=>{
    
    try{
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {$set: req.body}, {$new: true})
        res.status(200).json(updatedUser)
    }
    catch(error){
        res.status(500).json(error)
    }
}
export const deleteUser = async (req, res)=>{
    
    try{
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json("User deleted")
    }
    catch(error){
        res.status(500).json(error)
    }
}
export const getUser = async (req, res)=>{
    
    try{
        const users = await User.findById(req.params.id)
        res.status(200).json(users)
    }
    catch(error){
        res.status(500).json(error)
    }
}
export const getAllUsers = async (req, res)=>{
    
    try{
        const users = await User.find()
        res.status(200).json(users)
    }
    catch(error){
        res.status(500).json(error)
    }
}

export const addBooking = async (req, res) => {
  try {
    const userId = req.params.id; 
    const flightId = req.body.flightId;
    const seatId = req.body.seatId;
    // Find the user based on the user ID
    const user = await User.findById(userId);

    if (!user) {
      // User not found
      return res.status(404).json({ error: 'User not found.' });
    }

    // Add the booking ID to the user's bookings array
    user.bookings.push({flightId: flightId, seatId: seatId});
    // Save the updated user document
    await user.save();
    res.status(200).json({ message: 'Booking added successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while adding the booking.' });
  }
};


export const getUserBookings = async (req, res, next) => {
    try {
      const user = await User.findById(req.params.id).populate('bookings.flightId');
  
      if (!user) {
        alert("user not found")
      }
  
      const bookings = user.bookings.map(booking => ({
        flightNumber: booking.flightId,
        seatNumber: booking.seatId
      }));
      console.log(bookings)
      return bookings;
    } catch (err) {
      console.error(err);
        next(err);
    }
  };
  

