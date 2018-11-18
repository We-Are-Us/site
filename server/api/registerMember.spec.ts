import MembershipDetailsDto from '../../shared/dto/MembershipDetailsDto';
import registerMember from './registerMember';

describe('registerMember', () => {
  // FIXME: enable this test when we can cleanup properly
  it.skip('should work', async () => {
    const dto: MembershipDetailsDto = {
      firstName: 'Ted',
      lastName: 'Test',
      phoneNumber: '+64 9 429 9707',
      membership: 'standard',
      emailAddress: 'tes2@example.com',
      username: 'test',
      password: 'sneaky-s3cr3t',
      passwordConfirm: 'sneaky-s3cr3t'
    };

    await registerMember(dto);
  });
});
