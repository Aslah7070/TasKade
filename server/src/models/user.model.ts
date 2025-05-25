import mongoose, { Schema } from "mongoose";
import { IUser } from "../types/type";




const userSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePicture:{type:String},
  phoneNumber: {type: String},
  		status: {
			type: String,
			default: "active",
		},
		subscription: {
			type: String,
			default: "free",
		},
		verified: {
			type: Boolean,
			default: false,
		},
		isBlocked: {
			type: Boolean,
			default: false,
		},

});

export const User = mongoose.model('User', userSchema);

// import mongoose, { type Document, Schema } from "mongoose";
// import { IUser } from "../types/type";



// // const userSchema: Schema = new Schema<IUser>(
// // 	{
// // 		firstName: {
// // 			type: String,
// // 			required: true,
// // 		},
// // 		lastName: {
// // 			type: String,
// // 			required: true,
// // 		},
// // 		email: {
// // 			type: String,
// // 			required: true,
// // 			unique: true,
// // 		},
// // 		image: {
// // 			type: String,
// // 			required: false,
// // 		},
// // 		password: {
// // 			type: String,
// // 			required: true,
// // 		},
// // 		phoneNumber: {
// // 			type: String,
// // 			required: false,
// // 		},
// // 		status: {
// // 			type: String,
// // 			default: "active",
// // 		},
// // 		subscription: {
// // 			type: String,
// // 			default: "free",
// // 		},
// // 		verified: {
// // 			type: Boolean,
// // 			default: false,
// // 		},
// // 		isBlocked: {
// // 			type: Boolean,
// // 			default: false,
// // 		},
// // 	},
// // 	{ timestamps: true },
// // );

// // export const User = mongoose.model<IUser>("User", userSchema);
