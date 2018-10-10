type EmailAddress = string;
type IPAddress = string;

interface User {
  identifier: EmailAddress | IPAddress;
}

const isEnabled = (identifier: string, user?: User): boolean => {
  return false;
};
