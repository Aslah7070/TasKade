import { transporter } from "../configs/transport.config";
import { env } from "../configs/env.configs";


export const sendOtpEmail = async (email: string, otp: string) => {
  try {
    
    const mailOptions = {
      from:  `"Habitude" <${env.SENDER_EMAIL}>`,
      to: email,
      subject: "Habitude OTP Verificaiton",
      html: `
          <h1>OTP Verification</h1>
          <p>Your OTP is: ${otp}</p>
          <p>Use this OTP to verify your email. Do not share it with anyone.</p><br />
          <p>If you did not request this verification, you can ignore this email.</p>
          <p>~ Habitude</p>
            `,
    };

    const info = await transporter.sendMail(mailOptions);
  } catch (err) {
    console.error("Error sending verification email:", err);
    throw new Error("Error sending otp email");
  }
};

export const sendResetPasswordEmail = async (email: string, token: string) => {
  try {
    const resetPasswordUrl = `${env.RESET_PASS_URL}?token=${token}`;

    const mailOptions = {
      from: `"TasKade" <${env.SENDER_EMAIL}>`,
      to: email,
      subject: "Reset Your Password - TasKade",
      html: `
            
                <h1> Password Reset Request </h1>
                <p> You have requested to reset your password. Click the link below to proceed :  </p>
                <p> <a href="${resetPasswordUrl}" target="_blank" >Reset Password </a> </p>
                <p>If you did not request this, you can ignore this email.</p><br />
                <p>~ TasKade</p>
            
            `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Password reset email sent successfully", info.response);
  } catch (error) {
    console.error("Error sendResetPasswordEmail", error);
    throw new Error("Error sending reset pass email");
  }
};

export const sendInviteEmail=async(email:string,token:string,inviterName:string,workspaceName:string,spaceId:string)=>{
  const inviteLink=`${process.env.INVITE_LINK}/${spaceId}?token=${token}`
  const mailOptions={
  from: `"TasKade" <${env.SENDER_EMAIL}>`,
  to:email,
  subject:"Invite to work space",
 html: `
    <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
        <h1>You're Invited to Join a Workspace!</h1>
        <p>Hello,</p>
        <p><strong>${inviterName}</strong> has invited you to join the workspace <strong>"${workspaceName}"</strong> on <strong>TasKade</strong>.</p>
        <p>Click the link below to accept the invitation and get started:</p>
        <p>
            <a href="${inviteLink}" target="_blank" 
               style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px;">
               Accept Invitation
            </a>
        </p>
        <p>If you did not expect this invitation, you can safely ignore this email.</p>
        <br />
        <p>~ The TasKade Team</p>
    </div>
`
  
  }
  const info=await transporter.sendMail(mailOptions)
  console.log("sendmail",info);
  
}