import mongoose,{Schema} from "mongoose";
import { IWorkspace } from "../types/type"; 

const workspaceSchema: Schema<IWorkspace> = new Schema(
	{
		name: { type: String, required: true },
		description: { type: String },
		members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
		pendingMembers: [{ type: String }],
		spaces: [{ type: mongoose.Schema.Types.ObjectId, ref: "Space" }],
		visibility: { type: String, default: "private", required: true },
		createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
	},
	{ timestamps: true },
);

const Workspace = mongoose.model<IWorkspace>("Workspace", workspaceSchema);
export default Workspace;