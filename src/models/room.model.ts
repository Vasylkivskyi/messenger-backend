import mongoose, { model, Schema } from "mongoose";
import { Room } from "~/types";

const MessageSchema: Schema = new mongoose.Schema<Room>({
  users: [{ type: Schema.Types.ObjectId, required: true, ref: 'User' }],
  messages: [{ type: Schema.Types.ObjectId, ref: 'Message' }],
}, { timestamps: true, });

export default model('Message', MessageSchema);


