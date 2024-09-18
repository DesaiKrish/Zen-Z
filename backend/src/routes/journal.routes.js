import { Router } from "express";
import { createJournal,FindAllJournals,deleteJournal,updateJournal } from "../controllers/journal.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router()

router.route("/createJournal").post(verifyJWT, createJournal);

router.route("/findAllJournals").get(verifyJWT, FindAllJournals);

router.route("/deleteJournal").delete(verifyJWT, deleteJournal);

router.route("/updateJournal").post(verifyJWT, updateJournal);

export default router