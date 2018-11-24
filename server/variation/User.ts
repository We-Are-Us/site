interface User {
  key: string;
  firstName?: string;
  lastName?: string;
  name?: string;
  email?: string;
  ip?: string;
  country?: string;
  avatar?: string;
  anonymous?: boolean;
  custom?: {
    [key: string]: string | boolean | number | Array<string | boolean | number>;
  };
}

export default User;
