import mongoose, { type Document, Schema, type Types } from "mongoose";
import { ISpace } from "../types/type";


const spaceSchema: Schema<ISpace> = new Schema(
	{
		workspaceId: {
			type: Schema.Types.ObjectId,
			ref: "workspace",
			required: true,
		},
		color: {
			bg:{type:String},
			text:{type:String}
		 },
		name: { type: String, required: true },
		description: { type: String },
		lists: [{ type: Schema.Types.ObjectId, ref: "List", optional: true }],
		position: {type:Number,required: true},
	},
	{ timestamps: true },
);

export const Space = mongoose.model<ISpace>("Space", spaceSchema);
