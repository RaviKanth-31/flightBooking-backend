import express from "express"
import { createUser, updateUser, deleteUser, getUser, getAllUsers } from "../controllers/users.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";
const router = express.Router();

router.get("/checkauthentication", verifyToken, (req, res, next)=>{
    res.send("Hello user, you are logged in");
})

router.get("/checkuser/:id", verifyUser, (req, res, next)=>{
    res.send("Hello user, you are logged in and can delete your account");
})
router.get("/checkadmin/:id", verifyAdmin, (req, res, next)=>{
    res.send("Hello admin");
})
//CREATE
router.post("/", createUser)
//UPDATE
router.put("/:id", verifyUser, updateUser)
//DELETE
router.delete("/:id", verifyUser, deleteUser)
//GET
router.get("/:id",verifyUser, getUser)
//GET ALL
router.get("/", verifyAdmin, getAllUsers)


export default router