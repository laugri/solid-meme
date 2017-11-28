// @flow

import { computeApartmentOutput } from './index';
import data from './data.json';

const smallApartmentSpec = data.apartments.small;
const largeApartmentSpec = data.apartments.large;

describe('computeApartmentOutput', () => {
  test('should compute the max ouptut of a small apartment', () => {
    expect(computeApartmentOutput(smallApartmentSpec)).toEqual(3);
  });
  test('should compute the max ouptut of a large apartment', () => {
    expect(computeApartmentOutput(largeApartmentSpec)).toEqual(9);
  });
});
