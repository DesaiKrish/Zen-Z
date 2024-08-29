import { Router } from "express";
import { registerUser, loginUser, logoutUser, refreshAccessToken, updateAccountDetails, updateProfPic, changeCurrentPassword, getCurrentUser } from "../controllers/user.controller.js";
import { upload } from "../middleware/multer.middleware.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router()

router.route("/register").post(
    upload.fields([
        {
            name: "profpic",
            maxCount: 1
        }
    ]),
    registerUser
)

router.route("/login").post(loginUser)

router.route("/logout").post(verifyJWT, logoutUser)

router.route("/refresh-token").post(refreshAccessToken)

router.route("/changePassword").post(verifyJWT, changeCurrentPassword)

router.route("/me").get(verifyJWT, getCurrentUser)

router.route("/updateAccount").post(verifyJWT, updateAccountDetails)

router.route("/updateProfPic").post(verifyJWT, upload.single("profpic"), updateProfPic)

export default router