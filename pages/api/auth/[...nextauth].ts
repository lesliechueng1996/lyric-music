import { User } from 'models/db/user';
import NextAuth, { Session } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { findUserByEmail } from 'utils/db/user-dao';
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
          throw Error('系统异常');
        }
        let user: User;
        try {
          user = await findUserByEmail(credentials.email);
        } catch (e) {
          logger.error(e, 'find user error');
          throw Error('系统异常');
        }
        if (!user) {
          logger.error(`no such user: ${credentials.email}`);
          throw Error('邮箱或密码错误');
        }
        if (!checkPwd(credentials.email, credentials.password, user.password)) {
          logger.error(`password error: ${credentials.email}`);
          throw Error('邮箱或密码错误');
        }
        return {
          id: user._id,
          nickname: user.nickname,
          avatar: user.avatar,
          isAdmin: user.isAdmin,
        };
      },
    }),
  ],
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.user = user;
      }
      return token;
    },
    session: ({ session, token }) => {
      if (token.user) {
        session.user = token.user as Session['user'];
      }
      return session;
    },
  },
});
