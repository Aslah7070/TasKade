import mongoose, { type Document, Schema, type Types } from "mongoose";

interface ITask extends Document {
  spaceId: Types.ObjectId;
  name: string;
  description?: string;
  dueDate?: Date;
  priority?: string;
  assignedTo?: Types.ObjectId;
}

const taskSchema: Schema<ITask> = new Schema(
  {
    spaceId: { type: Schema.Types.ObjectId, ref: "list", required: true },
    name: { type: String, required: true },
    description: { type: String },
    priority: { type: String, default: "medium" },
    dueDate: { type: Date },
    assignedTo: [{ type: Schema.Types.ObjectId, ref: "user" }],
  },
  { timestamps: true }
);

export const Task = mongoose.model<ITask>("Task", taskSchema);

