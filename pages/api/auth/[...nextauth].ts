import UserModel from 'models/db/User';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { checkPwd } from 'utils/string-utils';
import logger from '../../../utils/logger';

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'email' },
        password: { label: 'password' },
      },
      authorize: async (credentials) => {
        logger.info('user login');
        if (!credentials) {
          logger.error(credentials, 'credentials null');
          throw Error('登录失败');
        }
        const user = await UserModel.findOne({
          email: credentials.email,
        });
        if (!user) {
          logger.error(`no such user: ${credentials.email}`);
          throw Error('邮箱或密码错误');
        }
        if (!checkPwd(credentials.email, credentials.password, user.password)) {
          logger.error(`password error: ${credentials.email}`);
          throw Error('邮箱或密码错误');
        }
        return user;
      },
    }),
  ],
});
