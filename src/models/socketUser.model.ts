import mongoose, { model, Schema } from "mongoose";

const SocketUserSchema: Schema = new mongoose.Schema({
  userId: { type: String, required: true,  },
  socketId: { type: String, required: true, },
}, { timestamps: true, });

export default model('SocketUser', SocketUserSchema);


