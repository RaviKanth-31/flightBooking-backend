import express from "express"
import { changeSeatAvailability, createSeat, deleteSeat, getAllSeats, getSeat, updateSeat } from "../controllers/seats.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

router.post("/:flightid", verifyAdmin, createSeat)
//UPDATE
router.put("/:id", verifyAdmin, updateSeat)
router.put("/availability/:id", changeSeatAvailability)
//DELETE
router.delete("/:id", verifyAdmin, deleteSeat)
//GET
router.get("/find/:id", getSeat)
//GET ALL
router.get("/", getAllSeats)

export default router