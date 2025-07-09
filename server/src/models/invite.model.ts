
import mongoose from "mongoose";


const invitationSchema = new mongoose.Schema({
  email: { type: String, required: true },
  workspaceId: { type: mongoose.Schema.Types.ObjectId, ref: "Workspace", required: true },
  token: { type: String, required: true, unique: true },
  status: { type: String, enum: ['pending', 'accepted'], default: 'pending' },
  expiresAt: { type: Date, required: true },
  acceptedAt: { type: Date },
});


export const Invitation=mongoose.model("Invitation",invitationSchema)