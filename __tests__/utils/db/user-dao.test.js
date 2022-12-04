import { findUserByEmail } from '@/utils/db/user-dao';
import UserModel from '@/models/db/user';
import { connect } from '@/utils/db/index';

jest.mock('@/utils/db/index', () => {
  return {
    connect: jest.fn(),
  };
});

jest.mock('@/models/db/user', () => {
  return {
    findOne: jest.fn(async (param) => {
      return {
        email: param.email,
      };
    }),
  };
});

describe('user dao test', () => {
  test('find user by email success', async () => {
    const email = 'mock@email.com';
    const user = await findUserByEmail(email);

    expect(connect).toHaveBeenCalled();
    expect(user.email).toEqual(email);
    expect(UserModel.findOne.mock.lastCall[0].email).toEqual(email);
  });
});
