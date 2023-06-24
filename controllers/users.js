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