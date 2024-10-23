import { Router } from "express";
import { createHabit, updateHabit, deleteHabit, findAllHabit } from "../controllers/habit.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router()

router.route("/createHabit").post(verifyJWT, createHabit)

router.route("/updateHabit").post(verifyJWT, updateHabit)

router.route("/deleteHabit/:id").delete(verifyJWT, deleteHabit)

router.route("/findAllHabit").get(verifyJWT, findAllHabit)

export default router