import mongoose, { Schema } from "mongoose";
import mongooseFuzzySearching, { MongooseFuzzyModel } from 'mongoose-fuzzy-searching';

const UserSchema: Schema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, { timestamps: true, });

UserSchema.plugin(mongooseFuzzySearching, { fields: ['name', 'email'] });

const User = mongoose.model('User', UserSchema) as MongooseFuzzyModel<any>;


export default User;