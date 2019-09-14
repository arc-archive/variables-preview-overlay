import { assert } from '@open-wc/testing';
import { varsSort, valueLabel } from '../src/utils.js';

describe('utils', () => {
  describe('varsSort()', () => {
    it('Returns 0 when a.enabled === b.enabled', () => {
      const result = varsSort({
        enabled: true
      }, {
        enabled: true
      });
      assert.equal(result, 0);
    });

    it('Returns 1 when a.enabled < b.enabled', () => {
      const result = varsSort({
        enabled: false
      }, {
        enabled: true
      });
      assert.equal(result, 1);
    });

    it('Returns -1 when a.enabled > b.enabled', () => {
      const result = varsSort({
        enabled: true
      }, {
        enabled: false
      });
      assert.equal(result, -1);
    });
  });

  describe('valueLabel()', () => {
    it('Returns undefined when no argument', () => {
      const result = valueLabel();
      assert.isUndefined(result);
    });

    it('Returns string when no maskedValues', () => {
      const result = valueLabel('test', false);
      assert.equal(result, 'test');
    });

    it('Returns masked value', () => {
      const result = valueLabel('test value', true);
      assert.equal(result, '••••••••••');
    });
  });
});
