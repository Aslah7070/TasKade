import { Request,Response } from "express";
import { Space } from "../models/space.model";
import { List } from "../models/list.model";
import { HttpStatus } from "../constans/status.constant";
import { Invitation } from "../models/invite.model";
import Workspace from "../models/workspace.model";
import { sendInviteEmail } from "../utils/send-email.util";
import * as crypto from 'crypto';
import { User } from "../models/user.model";
import { HttpResponse } from "../constans/response-message.constant";
import { toObjectId } from "../utils/convert.objectId.utils";
import { Types } from "mongoose";

export const createList = async (req: Request, res: Response) => {
	const spaceId = req.params.spaceId;
	const { name, description, color, task } = req.body;

	const space = await Space.findById(spaceId);

	if (!space) {
		
        res.standardResponse(HttpStatus.NOT_FOUND,{success:false,message:"space not found"})
        return
	}

	const newList = new List({
		spaceId,
		name,
		description,	
		color,
		task: task || [],
	});
     console.log("lays",newList);
	 
	await Promise.all([newList.save(), space.updateOne({ $push: { lists: newList._id } })]);
    res.standardResponse(HttpStatus.CREATED,{success:true,message:"List Created Successfully",newList})
	
};

export const getAllLists = async (req: Request, res: Response) => {
	const { spaceId } = req.params;

	const lists = await List.find({ spaceId });

	if (!lists || lists.length === 0) {
		  res.standardResponse(HttpStatus.NOT_FOUND,{success:false,message:"No lists found for this space"})
        return
		
	}
 res.standardResponse(HttpStatus.OK,{success:true,message:"List Created Successfully",lists})
	

};

export const sentInvintLink = async (req: Request, res: Response) => {
	
  const { email, spaceId } = req.body;

  if (!email || !spaceId) {
     res.status(HttpStatus.FORBIDDEN).json({ success: false, message: "Email and spaceId are required." });
	 return
  }

 

	const user=await User.findOne({email:email})
 if(!user){
	res.status(HttpStatus.NOT_FOUND).json({success:false,message:HttpResponse.USER_NOT_FOUND})
	return
 }

 
    const existing = await Invitation.findOne({ email, workspaceId:spaceId, status: "pending" });
    if (existing) {
       res.status(HttpStatus.FORBIDDEN).json({ success: false, message: "Invitation already sent." });
	   return
    }
	   const verifiedId = toObjectId((spaceId as Types.ObjectId).toString());
   const worspace=await Workspace.findById(verifiedId)
    if(!worspace){
	res.status(HttpStatus.NOT_FOUND).json({success:false,message:'space not fount'})
	return
 }

   
    const token = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); 

    const newInvite = new Invitation({
      email,
      workspaceId:spaceId,
      token,
      expiresAt,
      status: "pending",
    });

	  const updated = await Workspace.findByIdAndUpdate(
     verifiedId,
	 {$set:{visibility:"public"}},
	 {new:true}
  );


  if(updated){
	res.status(HttpStatus.BAD_REQUEST).json({ success: false, message: "Workspace not found" });
	return
  }
       
    await newInvite.save();

    await sendInviteEmail(email, token,user.username,worspace.name,worspace.id);

    res.status(HttpStatus.OK).json({ success: true, message: "Invitation sent successfully." });
 
};