import { Types,Document } from "mongoose";

export interface IStreak {
    habitId: Types.ObjectId;
    streakDays: number;
  }
// export interface IUser extends Document {
// 	firstName: string;
// 	lastName: string;
// 	email: string;
// 	image?: string;
//   phoneNumber?:string;
//   status?:string
// 	password: string;
// 	subscription?: string | null;
// 	verified: boolean;
// 	isBlocked: boolean;
// }

export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    subscription: string;
    phoneNumber: string;
    profilePicture?: string;
    status?: string;
isBlocked:{type:Boolean}
verified:{type:Boolean}
  }
export interface IQuote extends Document{
  quoteText:string,
  authorName:string,
  authorImage:string,
    tags: string[]
}

export interface IWorkspace extends Document{
  	name: string;
	description?: string;
	members:Types.ObjectId[];
	pendingMembers: string[];
	spaces:Types.ObjectId[];
	visibility: string;
	createdBy:Types.ObjectId;
}

export interface ISpace extends Document {
	workspaceId: Types.ObjectId;
	name: string;
	description?: string;
	lists: Types.ObjectId[];
  color:{
    bg:string,
    text:string
  }
  position:number
}

export type Task = {
  _id: string;
  name: string;
  description: string;
  assignedTo: string[];
  dueDate?: string;
  priority?: string;
  listId: string;
  createdBy?: string;
  createdAt?: string;
  updatedAt?: string;
  color?: string;
  status?: string;
};