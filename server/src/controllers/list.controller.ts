import { Request,Response } from "express";
import { Space } from "../models/space.model";
import { List } from "../models/list.model";
import { HttpStatus } from "../constans/status.constant";


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