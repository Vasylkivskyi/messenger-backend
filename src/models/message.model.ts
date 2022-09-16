import mongoose, { model, Schema } from "mongoose";

const MessageSchema: Schema = new mongoose.Schema({
  senderId: { type: String, required: true,  },
  roomId: { type: String, required: true, },
  text: { type: String, required: true }
}, { timestamps: true, });

export default model('Message', MessageSchema);


