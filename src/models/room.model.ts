import mongoose, { model, Schema } from "mongoose";

const RoomSchema: Schema = new mongoose.Schema({
  members: [{ type: Schema.Types.ObjectId, required: true, ref: 'User' }],
}, { timestamps: true, });

export default model('Room', RoomSchema);


