import express from "express"
import { createFlight, updateFlight, deleteFlight, getFlight, getAllFlights, countByFlights, searchFlight, getFlightSeats, changeSeatAvailability} from "../controllers/flights.js"
import { verifyAdmin } from "../utils/verifyToken.js";
const router = express.Router();

//CREATE
router.post("/", verifyAdmin, createFlight)
//UPDATE
router.put("/:id", verifyAdmin, updateFlight)
router.put("/reduce/:id", changeSeatAvailability)
//DELETE
router.delete("/find/:id", verifyAdmin, deleteFlight)
//GET
router.get("/find/:id", getFlight)
//GET ALL
router.get("/", getAllFlights)

router.get("/countFlights", countByFlights)
router.get("/search", searchFlight)
router.get("/seats/:id", getFlightSeats)
export default router