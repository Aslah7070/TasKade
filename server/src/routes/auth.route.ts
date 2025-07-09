
import express from "express"

import { forgotPassword, getResetPassword, googleAuth, login, logout, resendOtp, signup, verifyOtpAndLogin } from "../controllers/auth.controller"
import { userAuth } from "../middlwares/authenticate.middleware";
import errorCatch from "../middlwares/catchErro.middleware";
const router=express.Router()


console.log("ddsad");
router


.post("/signup",errorCatch(signup))
.post("/login",errorCatch(login))
.post("/logout",userAuth,errorCatch(logout))
.post("/resendotp",errorCatch(resendOtp))
.post("/otpverification",errorCatch(verifyOtpAndLogin))
.post("/forgotpassword",errorCatch(forgotPassword))
.post("/googlelogin",errorCatch(googleAuth))
.post("/resetpassword",errorCatch(getResetPassword))

export  {router}        