/// <reference path="../types/index.d.ts" />
import MembershipDetailsDto from '../../shared/dto/MembershipDetailsDto';
import registerMember from './registerMember';
import * as random_name from 'node-random-name';
import * as randomstring from 'randomstring';
import { v4 as uuidv4 } from 'uuid';

describe('registerMember', () => {
  // FIXME: enable this test when we can cleanup properly
  it('should work', async () => {
    const firstName = random_name({ first: true });
    const lastName = random_name({ last: true });

    const username = `${firstName.toLowerCase()}.${lastName.toLowerCase()}`.substring(
      0,
      15
    );

    const emailAddress = `${username}@mailnator.com`;

    const phoneNumber = `+64 9 4299 ${randomstring.generate({
      length: 3,
      charset: 'numeric'
    })}`;

    const password = uuidv4();

    const dto: MembershipDetailsDto = {
      firstName,
      lastName,
      username,
      emailAddress,
      phoneNumber,
      membership: 'standard',
      password,
      passwordConfirm: password
    };

    await registerMember(dto);
  });
});
