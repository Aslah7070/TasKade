import mongoose, { type Document, Schema, type Types } from "mongoose";

interface IList extends Document {
	spaceId: Types.ObjectId;
	name: string;
	description?: string;
	color?: string[];
	task: Types.ObjectId[];
	createdAt: Date;
	updatedAt: Date;
}

const listsSchema: Schema<IList> = new Schema({
	spaceId: { type: Schema.Types.ObjectId, ref: "space", required: true },
	name: { type: String, required: true },
	description: { type: String },
	color: { type: String },
	task: [{ type: Schema.Types.ObjectId, ref: "task" }],
	createdAt: { type: Date, default: Date.now(), required: true },
	updatedAt: { type: Date, default: Date.now(), required: true },
});

listsSchema.pre("save", function (next) {
	this.updatedAt = new Date();
	next();
});

export const List = mongoose.model<IList>("List", listsSchema);

