import express, { Router } from "express";
import  {registerUser,loginUser}  from "../controllers/user.controller.js";
import { logOutUser, verifyUser } from "../controllers/verifyUser.controller.js";

const userRouter = express.Router()

userRouter.route("/register-user").post(registerUser);
userRouter.route("/login-user").post(loginUser)
userRouter.route("/verify-user").get(verifyUser)
userRouter.route("/logout-user").get(logOutUser)

export default userRouter;
