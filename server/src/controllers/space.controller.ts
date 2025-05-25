import { Request, Response } from "express"
import { HttpStatus } from "../constans/status.constant";
import Workspace from "../models/workspace.model";
import { Space } from "../models/space.model";
import mongoose from "mongoose";

export const createSpace = async (req: Request, res: Response) => {
	const name = "new space"
	const description = "new space created"
	const { workspaceId } = req.query;


	if (!workspaceId) {
		res.standardResponse(HttpStatus.NOT_FOUND, { success: false, message: "workspace id not found" })
		return
	}
	const workspace = await Workspace.findById(workspaceId);
	if (!workspace) {
		res.standardResponse(HttpStatus.NOT_FOUND, { success: false, message: "workspace  not found" })
		return
	}
	const spaceCount = await Space.countDocuments({ workspaceId });

	const newSpace = new Space({
		name,
		color: {
			bg: "",
			text: ""
		},
		description,
		workspaceId,
		lists: [],
		position: spaceCount
	});


	//reduce the load time with promise.all here
	await Promise.all([newSpace.save(), workspace.updateOne({ $push: { spaces: newSpace._id } })]);

	res.standardResponse(HttpStatus.CREATED, { success: true, message: "workspace created", newSpace })
	return
}

export const getSpace = async (req: Request, res: Response) => {
	const { workspaceId } = req.query

	if (!workspaceId) {
		res.standardResponse(HttpStatus.NOT_FOUND, { success: false, message: "workspace id not found" })
		return
	}
	const space = await Space.findById(workspaceId)
	if (!space) {

		res.standardResponse(HttpStatus.NOT_FOUND, { success: false, message: "workspace not found" })
		return
	}
	res.standardResponse(HttpStatus.CREATED, { success: true, message: "workspace created", space })
	return
}


export const getAllSpaces = async (req: Request, res: Response) => {
	const { workspaceId } = req.query;

	if (!workspaceId) {
		res.standardResponse(HttpStatus.NOT_FOUND, { success: false, message: "workspace id not found" })
		return
	}

	const spaces = await Space.aggregate([
		{ $match: { workspaceId: new mongoose.Types.ObjectId(workspaceId as string) } },

		{
			$lookup: {
				from: "lists",
				localField: "_id",
				foreignField: "spaceId",
				as: "lists",
			},
		},
		{
			$unwind: {
				path: "$lists",
				preserveNullAndEmptyArrays: true,
			},
		},
		{
			$lookup: {
				from: "tasks",
				localField: "lists._id",
				foreignField: "listId",
				as: "lists.tasks",
			},
		},
		{
			$group: {
				_id: "$_id",
				name: { $first: "$name" },
				description: { $first: "$description" },
				workspaceId: { $first: "$workspaceId" },
				color: {
					$first: "$color"
				},
				position: { $first: "$position" },
				lists: {
					$push: {
						_id: "$lists._id",
						name: "$lists.name",
						tasks: "$lists.tasks",
					},
				},
			},
		},
		{ $sort: { position: 1 } },
	]);
	console.log("spaces", spaces);

	res.standardResponse(HttpStatus.CREATED, { success: true, message: "Spaces fetched successfully", spaces })
	return


};


//get a specific space by id
export const getSpaceById = async (req: Request, res: Response) => {
	const { id } = req.params;

	const space = await Space.aggregate([
		{ $match: { _id: new mongoose.Types.ObjectId(id) } }, 
		{
			$lookup: {
				from: "lists", 
				localField: "_id",
				foreignField: "spaceId", 
				as: "lists",
			},
		},
		{
			$lookup: {
				from: "tasks", 
				localField: "lists._id",
				foreignField: "listId", 
				as: "tasks",
			},
		},
		{
			$addFields: {
				lists: {
					$map: {
						input: "$lists",
						as: "list",
						in: {
							$mergeObjects: [
								"$$list",
								{
									tasks: {
										$filter: {
											input: "$tasks",
											as: "task",
											cond: { $eq: ["$$task.listId", "$$list._id"] },
										},
									},
								},
							],
						},
					},
				},
			},
		},
		{ $project: { tasks: 0 } }, 
	]);

	

	if (!space.length) {
		res.standardResponse(HttpStatus.NOT_FOUND,{success:false,message:"space not found"})
		return
	}

	console.log("space",space);
	
res.standardResponse(HttpStatus.OK,{success:true,message:"Space fetched successfully",space})
		return
	
};


export const deleteSpaceById = async (req: Request, res: Response) => {
	const { id } = req.params;
	console.log("id", id);

	const deletedSpace = await Space.findByIdAndDelete(id);
	if (!deletedSpace) {

		res.standardResponse(HttpStatus.NOT_FOUND, { success: false, message: "Space not found" })
		return
	}
	await Workspace.findByIdAndUpdate(deletedSpace.workspaceId, { $pull: { spaces: id } });

	res.standardResponse(HttpStatus.OK, { success: true, message: "Space deleted successfully" })
	return
};

export const updateSpace = async (req: Request, res: Response) => {

	const { id } = req.params;
	const { name, description, color, lists } = req.body;
	console.log('color', color);


	if (!id) {
		res.standardResponse(HttpStatus.NOT_FOUND, { success: false, message: "space id not found" })
		return
	}

	const updatedSpace = await Space.findByIdAndUpdate(
		id,
		{ name, description, color, lists },
		{ new: true, runValidators: true }
	);

	if (!updatedSpace) {
		res.standardResponse(HttpStatus.NOT_FOUND, { success: false, message: "space not found" })
		return
	}

	res.standardResponse(HttpStatus.OK, { success: true, message: "Space updated successfully", updatedSpace })
	return

};

