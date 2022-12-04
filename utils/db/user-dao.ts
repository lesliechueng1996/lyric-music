import UserModel from '../../models/db/user';
import { connect } from '.';

export const findUserByEmail = async (email: string) => {
  await connect();
  const user = await UserModel.findOne({
    email,
  });
  return user;
};
