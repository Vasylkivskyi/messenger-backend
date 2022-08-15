import mongoose, { model, Schema } from "mongoose";
import { Message } from "~/types";

const MessageSchema: Schema = new mongoose.Schema<Message>({
  user: { type: mongoose.Schema.Types.ObjectId, required: true },
  text: { type: String, required: true }
}, { timestamps: true, });

export default model('Message', MessageSchema);


