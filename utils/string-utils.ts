import bcrypt from 'bcrypt';

export const encryptPwd = (email: string, password: string) => {
  return bcrypt.hashSync(`${email}{${password}}`, 0);
};

export const checkPwd = (
  email: string,
  inputPassword: string,
  dbPassword: string
) => {
  return bcrypt.compareSync(`${email}{${inputPassword}}`, dbPassword);
};
