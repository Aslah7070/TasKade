import { HttpStatus } from "../constans/status.constant"
import { User } from "../models/user.model"
import { Response,Request } from "express"
import { comparePassword, hashPassword } from "../utils/bcrypt.utils"
import { generateOTP } from "../utils/generate.otp.utils"
import { generateToken } from "../utils/generate.token.utils"
import { toObjectId } from "../utils/convert.objectId.utils"
import { generateRefreshToken } from "../utils/generate.refreshToken.util"
import { redisClient } from "../configs/redis.config"
import { generateGuestUsername } from "../utils/generate.uniquename.utils"
import { sendOtpEmail, sendResetPasswordEmail } from "../utils/send-email.util"
import { HttpResponse } from "../constans/response-message.constant"
import { generateNanoId } from "../utils/generate-nanoId.util"
import { OAuth2Client } from "google-auth-library";
import admin from "../configs/firebase.config"
import { Types } from "mongoose"


export const signup=async(req:Request,res:Response):Promise<void>=>{

    
    const {email,password}=req.body;

    const isExistng=await User.findOne({email:email})
    if(isExistng){
        res.status(HttpStatus.CONFLICT).json({success:false,message:"email is already existing"})
        return
    }
    const hashedPassword=await hashPassword(password)
    if(!hashedPassword){
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({success:false,message:"password hashing filed"})
        return
    }

    const guestUsername = await generateGuestUsername(redisClient);
    
  
    if(!guestUsername){
      res.status(HttpStatus.NOT_FOUND).json({success:false,message:HttpResponse.USER_NOT_FOUND})
      return
    }
    
    const user = new User({
      email,
      password: hashedPassword,
      username: guestUsername
    });
  
    await user.save();
  

 
    await redisClient.set(guestUsername, "true");

    const otp = generateOTP();
   
    
    if(!otp){
      res.status(HttpStatus.NOT_FOUND).json({succress:false,message:HttpResponse.OTP_NOT_FOUND})
      return
    }
    try {
      
      await sendOtpEmail(email, otp); 
  } catch (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ success: false, message:HttpResponse.SERVER_ERROR });
      return;
  }

  await redisClient.setEx(`otp_${email}`, 300, otp); 


  res.status(HttpStatus.OK).json({
      success: true,
      message: HttpResponse.USER_CREATION_SUCCESS,
      otp:true,
      email
  });
}



export const verifyOtpAndLogin=async(req:Request,res:Response)=>{
  const { email, otp } = req.body;
  const storedOtp = await redisClient.get(`otp_${email}`);

  if (!storedOtp) {
      res.status(HttpStatus.BAD_REQUEST).json({ success: false, message: "OTP expired or not found" });
      return;
  }


  if (storedOtp !== otp) {
      res.status(HttpStatus.BAD_REQUEST).json({ success: false, message: "Invalid OTP" });
      return;
  }
  const user = await User.findOne({ email: email });
    if (!user) {
        res.status(HttpStatus.NOT_FOUND).json({ success: false, message: HttpResponse.USER_NOT_FOUND });
        return;
    }

   
    const verifiedId = toObjectId((user._id as Types.ObjectId).toString());
    const payload={email:user.email,type:"User"}
   const token= await generateToken(verifiedId.toString(),payload,"7d")

   const refreshToken=generateRefreshToken(verifiedId.toString(),"7d")
   
   if(!token){
    res.status(HttpStatus.NOT_FOUND).json({success:true,message:HttpResponse.NO_TOKEN})
    return
   }

   res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    sameSite: "none",
  });
  res.cookie(`type`, "User", {
    httpOnly: true,
    secure: true,
    maxAge: 7 * 24 * 60 * 60 * 1000, 
    sameSite: 'none',
  });
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    sameSite: "none",
  });
  res.status(HttpStatus.OK).json({
    success: true,
    message: "OTP verified successfully, login complete",
    token: token,
    refreshToken:refreshToken,
    user:user,
    type:"User"
});
}

//resend otp....

export const resendOtp = async (req: Request, res: Response): Promise<void> => {
  const { email } = req.body; 

  const isExisting = await User.findOne({ email: email });

  if (!isExisting) {
      res.status(HttpStatus.NOT_FOUND).json({ success: false, message:HttpResponse.USER_NOT_FOUND });
      return;
  }

  try {

      const existingOtp = await redisClient.get(`otp_${email}`);
      
      if (existingOtp) {
          
          console.log("Resending OTP:", existingOtp);
          
          await sendOtpEmail(email, existingOtp); 
          res.status(HttpStatus.OK).json({ success: true,message:HttpResponse.OTP_SUCCESS,otp: existingOtp, });
          return;
      }
      const otp = generateOTP();
      if (!otp) {
          res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ success: false, message:HttpResponse.OTP_NOT_FOUND  });
          return;
      }
      try {
      
        await sendOtpEmail(email, otp); 
    } catch (err) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ success: false, message:HttpResponse.SERVER_ERROR });
        return;
    }
      
      await redisClient.setEx(`otp_${email}`, 300, otp);
       res.status(HttpStatus.OK).json({ success: true,message:HttpResponse.OTP_SUCCESS,
       
      });
  } catch (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          success: false,
          message: "Error occurred while resending OTP",
      });
  }
};



//forgotpassword


export const forgotPassword = async (req:Request, res:Response) => {
  const { email } = req.body;
  console.log("hey hello");
  
  const user = await User.findOne({ email });
  if (!user) {
     res.status(HttpStatus.NOT_FOUND).json({success:false, message: "User not found" });
     return
  }
  const token = generateNanoId();

  const storeOnReddis = await redisClient.setEx(token, 300, user.email);

  if (!storeOnReddis) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({success:false,message:HttpResponse.SERVER_ERROR})
  }
  await sendResetPasswordEmail(user.email, token);

  res.status(HttpStatus.OK).json({success:true,message:HttpResponse.RESET_PASS_LINK});
};




export const getResetPassword=async(req:Request,res:Response)=>{

  const { token, newPassword } = req.body;

  if (!token || !newPassword) {
    res.status(HttpStatus.NOT_FOUND).json({success:false,message:HttpResponse.NO_TOKEN});
    return 
  }
   const getEmail=await redisClient.get(token)
   if(!getEmail){
    res.status(HttpStatus.NOT_FOUND).json({success:false,message:HttpResponse.TOKEN_EXPIRED})
    return 
   }
  
   
   const hashedPassword = await hashPassword(newPassword);

     const user=await User.findOne({email:getEmail})
     if(!user){
      res.status(HttpStatus.NOT_FOUND).json({success:HttpResponse.USER_NOT_FOUND})
      return
     }
     user.password=hashedPassword;


   await redisClient.del(token);

   return {
       status: HttpStatus.OK,
       message: HttpResponse.PASSWORD_CHANGE_SUCCESS,
   };
}



export const login=async(req:Request,res:Response)=>{
        const {email,password}= req.body
        const user=await User.findOne({email:email})
        if(!user){
            res.status(HttpStatus.NOT_FOUND).json({success:false,message:`${email} not existing`})
            return
        }
        const isMatch=await comparePassword(password,user.password)
        if(!isMatch){
            res.status(HttpStatus.BAD_REQUEST).json({success:false,message:"wrong password"})
            return 
        }

        // const verifiedId=toObjectId(user._id.toString())
          const verifiedId = toObjectId((user._id as Types.ObjectId).toString());
        const payload={type:"User",email:user.email}
        const token= await generateToken(verifiedId.toString(),payload,"7d")
     
        const refreshToken=generateRefreshToken(verifiedId.toString(),"7d")
        
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite: "strict",
          });
          res.cookie(`type`, "User", {
            httpOnly: true,
            secure: true, 
            maxAge: 7 * 24 * 60 * 60 * 1000, 
            sameSite: 'none',
          });
          res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: false,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite: "strict",
          });

          res.status(HttpStatus.OK).json({success:true,message:"login successfylly",token:token,user})
}  

export const logout = async (req: Request, res: Response) => {


  const userId=req.user?.id
  const user=await User.findById(userId)

  
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "strict",
    secure: false,
  });

  res.clearCookie("refreshToken", {
    httpOnly: true,
    sameSite: "strict",
    secure: false,
  });
    res.clearCookie("type", {
    httpOnly: true,
    sameSite: "strict",
    secure: false,
  });
 
  res.status(HttpStatus.OK).json({
    success: true,
    message: "Logged out successfully",
  });
};


export const googleAuth = async (req: Request, res: Response) => {
  const { token } = req.body;

  if (!token) {
     res.status(HttpStatus.NOT_FOUND).json({ success: false, message:HttpResponse.NO_TOKEN  });
     return
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    const { uid, email, name, picture } = decodedToken;

    let user = await User.findOne({ email });

    if (!user) {
      const guestUsername = await generateGuestUsername(redisClient);
      const randomPassword = Math.random().toString(36).slice(-12);
      const hashedPassword = await hashPassword(randomPassword);

      user = new User({
        uid,
        email,
        username: guestUsername,
        profilePicture: picture,
        password: hashedPassword,
      });

      await user.save();
    }

    // const verifiedId = toObjectId(user._id.toString());  
      const verifiedId = toObjectId((user._id as Types.ObjectId).toString());
    const payloads = { type: "User", email: user.email };
    const authToken = await generateToken(verifiedId.toString(), payloads, "7d");
    const refreshToken = generateRefreshToken(verifiedId.toString(), "7d");

    res.cookie("token", authToken, { httpOnly: true, secure: false, maxAge: 7 * 24 * 60 * 60 * 1000, sameSite: "strict" });
    res.cookie("refreshToken", refreshToken, { httpOnly: true, secure: false, maxAge: 7 * 24 * 60 * 60 * 1000, sameSite: "strict" });
    res.cookie("type", "User", { httpOnly: true, secure: false, maxAge: 7 * 24 * 60 * 60 * 1000, sameSite: "strict" });

    res.status(HttpStatus.OK).json({ success: true, message:HttpResponse.GOOGLE_LOGIN_SUCCESS, token: authToken, refreshToken, user });

  } catch (err) { 
    console.error(err);
    res.status(401).json({ success: false, message: "Invalid Firebase token" });
  }
};



// const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// export const googleAuth = async (req: Request, res: Response) => {
//   const { token } = req.body;

//   if (!token) {
//     res.status(HttpStatus.NOT_FOUND).json({ success: false, message: HttpResponse.NO_TOKEN });
//     return;
//   }

//   const randomPassword = Math.random().toString(36).slice(-12);
//   const hashedPassword=await hashPassword(randomPassword)
//     if(!hashedPassword){
//         res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({success:false,message:HttpResponse.PASSWORD_HASHING})
//         return
//     }
//   let payload;
//   try {
//     const ticket = await client.verifyIdToken({
//       idToken: token,
//       audience: process.env.GOOGLE_CLIENT_ID,
//     });

//     payload = ticket.getPayload();
//     console.log("payload",payload);
    
//   } catch (err) {
//     res.status(HttpStatus.UNAUTHORIZED).json({ success: false, message: HttpResponse.USER_NOT_FOUND });
//     return;
//   }

//   const { email, name, picture, sub } = payload || {};

//   if (!email) {
//     res.status(HttpStatus.BAD_REQUEST).json({ success: false, message: HttpResponse.NO_TOKEN });
//     return;
//   }

//   let user = await User.findOne({ email });

//   if (!user) {
//     const guestUsername = await generateGuestUsername(redisClient);
//     console.log("usesrname",guestUsername);
//     if(!guestUsername){
//       res.status(HttpStatus.NOT_FOUND).json({success:false,message:HttpResponse.USER_NOT_FOUND})
//       return
//     }
//     user = new User({
//       email,
//       username: guestUsername,
//       profileImage: picture,
//       googleId: sub, 
//       password: hashedPassword, 
//     });

//     await user.save();
//   }

//   const verifiedId = toObjectId(user._id.toString());
//   const payloads={type:"User",email:user.email}
//   const authToken = await generateToken(verifiedId.toString(),payloads, "7d");
//   const refreshToken = generateRefreshToken(verifiedId.toString(), "7d");

  
//   res.cookie("token", authToken, {
//     httpOnly: true,
//     secure: false,
//     maxAge: 7 * 24 * 60 * 60 * 1000,
//     sameSite: "strict",
//   });

//   res.cookie("refreshToken", refreshToken, {
//     httpOnly: true,
//     secure: false,
//     maxAge: 7 * 24 * 60 * 60 * 1000,
//     sameSite: "strict",
//   });
//   res.cookie(`type`, "User", {
//     httpOnly: true,
//     secure: true,
//     maxAge: 7 * 24 * 60 * 60 * 1000, 
//     sameSite: 'none',
//   });

//   res.status(HttpStatus.OK).json({
//     success: true,
//     message: HttpResponse.GOOGLE_LOGIN_SUCCESS,
//     token: authToken,
//     refreshToken,
//     user,
//   });
// };

