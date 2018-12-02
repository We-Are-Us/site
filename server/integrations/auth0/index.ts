import { AuthenticationClient, ManagementClient, User } from 'auth0';
import config from '../../config';
import MembershipDetailsDto from '../../../shared/dto/MembershipDetailsDto';

const CONNECTION = 'Username-Password-Authentication';

const createAuthenticationClient = (): AuthenticationClient => {
  const audience = config.get('auth0.audience');
  const domain = `${audience}.auth0.com`;
  const clientId = config.get('auth0.managementApi.clientId');
  const clientSecret = config.get('auth0.managementApi.clientSecret');

  return new AuthenticationClient({
    domain,
    clientId,
    clientSecret
  });
};

const createManagementClient = async (): Promise<ManagementClient> => {
  const authenticationClient = createAuthenticationClient();
  const audience = config.get('auth0.audience');

  const { access_token } = await authenticationClient.clientCredentialsGrant({
    audience: `https://${audience}.auth0.com/api/v2/`
  });

  const domain = `${audience}.auth0.com`;

  return new ManagementClient({
    domain,
    token: access_token
  });
};

export const createUser = async (dto: MembershipDetailsDto): Promise<User> => {
  const auth0Client = await createManagementClient();
  const { username, emailAddress, password } = dto;

  const userData = {
    username,
    email: emailAddress,
    password,
    connection: CONNECTION
  };

  return auth0Client.createUser(userData);
};
