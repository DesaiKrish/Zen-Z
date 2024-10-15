import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser";

const app = express()

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))

app.use(express.json({limit: "32kb"}))
app.use(express.urlencoded({extended: true, limit: "32kb"}))
app.use(express.static("public"))
app.use(cookieParser())


import userRouter from "./routes/user.routes.js";
import taskRouter from "./routes/task.routes.js";
import habitRouter from "./routes/habit.route.js";
import journalRouter from "./routes/journal.routes.js";

app.use("/api/users", userRouter)

app.use("/api/tasks", taskRouter)

app.use("/api/habits", habitRouter)

app.use("/api/journals", journalRouter)

export { app }