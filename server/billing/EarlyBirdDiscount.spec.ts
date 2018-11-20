import * as MockDate from 'mockdate';
import EarlyBirdDiscount, { EARLY_BIRD_DATE } from './EarlyBirdDiscount';

describe('EarlyBirdDiscount', () => {
  describe('canBeApplied', () => {
    afterEach(() => {
      MockDate.reset();
    });

    it('it should be able to be applied before `EARLY_BIRD_DATE`', () => {
      MockDate.set('2018-10-10');

      const discount = new EarlyBirdDiscount();

      const actual = discount.canBeApplied();

      expect(actual).toBe(true);
    });

    it('it should not be able to be applied after `EARLY_BIRD_DATE`', () => {
      MockDate.set('2020-10-10');

      const discount = new EarlyBirdDiscount();

      const actual = discount.canBeApplied();

      expect(actual).toBe(false);
    });
  });
});
