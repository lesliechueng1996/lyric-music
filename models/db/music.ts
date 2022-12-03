import mongoose, { model, Schema } from 'mongoose';
import { BaseModel } from './base-type';

export interface Music extends BaseModel {
  musicId: string;
  lyricId?: string;
  name: string;
  singer: string;
  duration: string;
  isFavorite: boolean;
}

const musicSchema = new Schema(
  {
    musicId: {
      type: String,
      required: true,
      unique: true,
    },
    lyricId: {
      type: String,
      required: false,
    },
    name: {
      type: String,
      required: true,
    },
    singer: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    isFavorite: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const MusicModel = mongoose.models.Music || model('Music', musicSchema);
export default MusicModel;
