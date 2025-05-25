import { Request, Response } from "express";
import Workspace from "../models/workspace.model";
import { HttpStatus } from "../constans/status.constant";
import { hasAccess } from "../utils/workspace.utils";



export const createWorkSpace=async(req:Request,res:Response)=>{
    	console.log("create");
const { name, description, visibility = "private" } = req.body;

	const userId = req.user?.id;

	const workspace = new Workspace({
		name,
		description,
		visibility,
		members: [userId],
		createdBy: userId,
	});

	await workspace.save();
    

res.standardResponse(HttpStatus.CREATED,{success:true,message:"wokspace created",workspace})
}



export const getActiveWorkspaces = async (req: Request, res: Response) => {
	console.log("active");
	
	const userId = req.user?.id;

	const activeWorkspaces = await Workspace.find({
		members: { $in: [userId] },
	}).populate("createdBy");

	const pendingWorkspaces = await Workspace.find({
		pendingMembers: { $in: [userId] },
	});

	res.standardResponse(HttpStatus.OK,{success:true,message:"findworkspace",activeWorkspaces,pendingWorkspaces})
};

export const deleteWorkspace = async (req: Request, res: Response) => {
	const { id } = req.params;
	const workspace = await Workspace.findById(id);

	if (!workspace) {
		res.status(HttpStatus.NOT_FOUND).json({success:false,message:"work space not found"})
		return
	}
	await hasAccess(workspace, req.user?.id || "", "owner");
	await workspace.deleteOne();
	res.standardResponse(HttpStatus.OK,{success:true,message:"work space deleted successfully"})

	res.status(204).json(("Workspace deleted successfully"));
};
export const getWorkspaceById = async (req: Request, res: Response) => {
	const { id } = req.params;
	console.log('if',id);
	
 
	const workspace = await Workspace.findById(id);

	if (!workspace) {
		res.standardResponse(HttpStatus.NOT_FOUND,{success:true,message:"workspace not found"})
		return
	}

	if (workspace.visibility === "private") await hasAccess(workspace, req.user?.id || "");

	res.standardResponse(HttpStatus.OK,{success:true , message:"workspace find successfully",workspace})
};



export const updateWorkspace = async (req:Request, res: Response) => {
	const { id } = req.params;

	const updateWorkspace = req.body;

	const workspace = await Workspace.findById(id);

	if (!workspace) {
		res.standardResponse(HttpStatus.NOT_FOUND,{success:true,message:"workspace not found"})
		return
	}

	await hasAccess(workspace, req.user?.id || "", "owner");

	const updated = await workspace.updateOne({ $set: updateWorkspace }, { new: true });
	
	res.standardResponse(HttpStatus.OK,{success:true , message:"workspace updated successfully",updated})


};


export const createColum=async(req:Request,res:Response)=>{
	
}