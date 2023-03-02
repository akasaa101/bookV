import * as bcrypt from 'bcryptjs';

export const hashPassword = async (password) => {
  const hashed = await bcrypt.hash(password, 10);
  return hashed;
};

export const comparePassword = async (args: {
  password: string;
  hash: string;
}) => {
  return await bcrypt.compare(args.password, args.hash);
};

export const validateUser = (payload: any) => {
  const user = {
    id: payload.id,
    username: payload.username,
    displayName: payload.displayName,
  };
  return user;
};
