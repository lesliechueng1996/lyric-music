import mongoose, { model, Schema } from 'mongoose';
import { BaseModel } from './base-type';

export interface User extends BaseModel {
  email: string;
  password: string;
  nickname: string;
  avatar: string;
  isAdmin: boolean;
}

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    nickname: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: false,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.models.User || model('User', userSchema);
export default UserModel;
