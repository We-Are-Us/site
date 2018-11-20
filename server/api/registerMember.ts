import * as ono from 'ono';
import { User } from 'auth0';
import MembershipDetailsDto from '../../shared/dto/MembershipDetailsDto';
import { createUser } from '../integrations/auth0';
import { createDatabaseConnection } from '../database';
import { createAccount } from '../database/account';
import { createPractitioner } from '../database/practitioner';
import logger from '../logging/logger';
import { omit } from 'lodash';
import { StandardPlan } from '../domain/Plan';
import { Account } from '../entity/Account';

const registerMember = async (dto: MembershipDetailsDto) => {
  // do we want to pass connection down from the route handler?
  // TODO: transactions
  const connection = await createDatabaseConnection();

  try {
    const tasks: ReadonlyArray<Promise<any>> = [
      createUser(dto),
      createAccount(connection, dto)
      // TODO: add to mailchimp
    ];

    const results = await Promise.all(tasks);

    const auth0 = results[0] as User;
    const account = results[1] as Account;

    logger.debug('auth0: %o', auth0);
    logger.debug('account: %o', account);

    const auth0Id = auth0.user_id;

    // FIXME
    const planId = StandardPlan.id;

    const practitioner = omit(
      Object.assign({ auth0Id, account, planId }, dto),
      ['password', 'passwordConfirm', 'membership', 'username']
    );

    logger.debug('practitioner: %o', practitioner);

    await createPractitioner(connection, practitioner);
  } catch (err) {
    // TODO: how to rollback if 1 fails?
    throw ono.error(err, 'Error registering member');
  } finally {
    connection.close();
  }
};

export default registerMember;
