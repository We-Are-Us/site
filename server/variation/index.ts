import { Request } from 'hapi';
import { v4 } from 'uuid';
import User from './User';
import variations from './variations';

const USER_KEY = 'userKey';

export const getUser = (request: Request) => {
  const savedUser: User = request.yar.get(USER_KEY);

  if (savedUser != null) {
    return savedUser;
  }

  const key = v4();
  const user: User = { key, anonymous: true };

  request.yar.set(USER_KEY, user);

  return user;
};

const variation = async (
  key: string,
  user: User,
  defaultValue: boolean = false
) => await variations(key, user, defaultValue);

export default variation;
