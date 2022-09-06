import mongoose, { Schema } from "mongoose";
import mongooseFuzzySearching, { MongooseFuzzyModel } from 'mongoose-fuzzy-searching';

const UserSchema: Schema = new mongoose.Schema({
  username: { type: String, required: [true, 'Please enter your username'], unique: true },
  hint: { type: String, required: [true, 'Without a hint, you will not restore your password'] },
  password: { type: String, required: [true, 'Please enter your password'] },
  messages: [{ type: Schema.Types.ObjectId, ref: 'Message' }],
  rooms: [{ type: Schema.Types.ObjectId, ref: 'Room' }]
}, { timestamps: true, });

UserSchema.plugin(mongooseFuzzySearching, { fields: ['username'] });

const User = mongoose.model('User', UserSchema) as MongooseFuzzyModel<any>;


export default User;