import MembershipDetailsDto from '../../shared/dto/MembershipDetailsDto';
import { Connection, InsertResult } from 'typeorm';
import { Account } from '../entity/Account';

export const createAccount = async (
  dto: MembershipDetailsDto,
  connection: Connection
): Promise<InsertResult> => {
  const values = {
    username: dto.username,
    // TODO: enum or similar
    role_id: 2
  };

  return connection
    .createQueryBuilder()
    .insert()
    .into(Account)
    .values(values)
    .execute();
};
