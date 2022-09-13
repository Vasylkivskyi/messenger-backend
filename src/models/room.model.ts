import mongoose, { model, Schema } from "mongoose";

const RoomSchema: Schema = new mongoose.Schema({
  users: [{ type: Schema.Types.ObjectId, required: true, ref: 'User' }],
  messages: [{ type: Schema.Types.ObjectId, ref: 'Message' }],
}, { timestamps: true, });

export default model('Room', RoomSchema);


