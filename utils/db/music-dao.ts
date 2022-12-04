import { BaseModel } from '@/models/db/base-type';
import MusicModel, { Music } from '@/models/db/music';
import { connect } from '.';

export const saveMusicRecord = async (data: Omit<Music, keyof BaseModel>) => {
  await connect();
  await MusicModel.create(data);
};
