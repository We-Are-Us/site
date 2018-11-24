import User from './User';

export const HOMEPAGE_VARIATION = 'homepage';

const variations = (key: string, user: User, defaultValue: boolean) => {
  switch (key) {
    case HOMEPAGE_VARIATION:
      if (user.hasOwnProperty('email') && user.email === 'walter@rumsby.net') {
        return Promise.resolve(true);
      }

      return Promise.resolve(false);
    default:
      return Promise.resolve(defaultValue);
  }
};

export default variations;
