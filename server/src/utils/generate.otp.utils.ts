import crypto from "crypto"
import { START_INTERVAL, END_INTERVAL } from "../constans/otp.intervel.constant"

export const generateOTP = () => {
    return crypto.randomInt(START_INTERVAL, END_INTERVAL+1).toString()
}