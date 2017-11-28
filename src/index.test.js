import { computeSmallApartmentOutput } from './index';

describe('computeSmallApartmentOutput', () => {
  test('should compute the max ouptut of a small apartment', () => {
    expect(computeSmallApartmentOutput()).toEqual(3);
  });
});
