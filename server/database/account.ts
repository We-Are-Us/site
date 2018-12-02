import MembershipDetailsDto from '../../shared/dto/MembershipDetailsDto';
import { Connection, InsertResult } from 'typeorm';
import { Account } from '../entity/Account';

export const findAccount = async (
  connection: Connection,
  id: number
): Promise<Account | undefined> =>
  connection.getRepository(Account).findOne({ id });

export const createAccount = async (
  connection: Connection,
  dto: MembershipDetailsDto
): Promise<Account> => {
  const values = {
    username: dto.username,
    // TODO: enum or similar
    role_id: 2
  };

  return connection.getRepository(Account).save(values);
};
