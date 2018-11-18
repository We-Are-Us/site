import * as ono from 'ono';
import MembershipDetailsDto from '../../shared/dto/MembershipDetailsDto';
import { createUser } from '../integrations/auth0';
import { createDatabaseConnection } from '../database';
import { createAccount } from '../database/account';

const registerMember = async (dto: MembershipDetailsDto) => {
  // do we want to pass connection down from the route handler?
  const connection = await createDatabaseConnection();

  try {
    const tasks: ReadonlyArray<Promise<any>> = [
      createUser(dto),
      createAccount(dto, connection)
      // TODO: add to mailchimp
    ];
    // TODO: need to save memembership too

    await Promise.all(tasks);
  } catch (err) {
    throw ono.error(err, 'Error registering member');
  } finally {
    connection.close();
  }
};

export default registerMember;
