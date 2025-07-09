import { IWorkspace } from "../types/type";
import { CustomError } from "./customError.utils";

export const hasAccess = async (workspace: IWorkspace, userId: string, role: "owner" | "user" = "user") => {
	console.log("role ===  && workspace.createdBy.toString() !== userId",role === "owner" && workspace.createdBy.toString() !== userId);
	console.log(workspace.createdBy.toString());
	console.log(userId);
	console.log(role);
	

	if (role === "owner" && workspace.createdBy.toString() !== userId) {
		throw new CustomError("You do not have permission to do this!", 403);
	}

	if (workspace.members.every((member) => member.toString() !== userId)) {
		throw new CustomError("You are not a member of this workspace", 403);
	}
};