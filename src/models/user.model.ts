import mongoose, { Schema } from "mongoose";
import mongooseFuzzySearching, { MongooseFuzzyModel } from 'mongoose-fuzzy-searching';

const UserSchema: Schema = new mongoose.Schema({
  nickname: { type: String, required: [true, 'Please enter your nickname'], unique: true },
  hint: { type: String, required: [true, 'Without a hint, you will not restore your password'] },
  password: { type: String, required: [true, 'Please enter your password'] },
}, { timestamps: true, });

UserSchema.plugin(mongooseFuzzySearching, { fields: ['nickname'] });

const User = mongoose.model('User', UserSchema) as MongooseFuzzyModel<any>;


export default User;