import { Router } from "express";
import { createTask, updateTask, deleteTask, findAllTask } from "../controllers/task.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router()

router.route("/createTask").post(verifyJWT, createTask)

router.route("/updateTask").post(verifyJWT, updateTask)

router.route("/deleteTask").delete(verifyJWT, deleteTask)

router.route("/findAllTask").get(verifyJWT, findAllTask)


export default router
