import mongoose, { model, Schema } from "mongoose";

const UserSchema: Schema = new mongoose.Schema({
  nickname: { type: String, required: [true, 'Please enter your name'], unique: true },
  hint: { type: String, required: [true, 'Without a hint, you will not restore your password'] },
  password: { type: String, required: [true, 'Please enter your password'] },
}, { timestamps: true, });

const User = model('User', UserSchema);

export default User;