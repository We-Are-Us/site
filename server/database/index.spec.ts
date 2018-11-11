import { getConnectionOptions } from './index';

describe('database', () => {
  describe('getConnectionOptions', () => {
    it('should work with the default config valud', () => {
      const databaseUrl = new URL('postgres://localhost:5432/weareus');
      const actual = getConnectionOptions(databaseUrl);

      expect(actual.type).toBe('postgres');
      expect(actual.host).toBe('localhost');
      expect(actual.port).toBe(5432);
      expect(actual.database).toBe('weareus');
    });
  });
});
