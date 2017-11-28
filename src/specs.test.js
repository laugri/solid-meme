// @flow

import { getFacilitySpecs, getApartmentSpecs } from './specs.js';

describe('getFacilitySpecs', () => {
  test('should return the correct spec for the type', () => {
    expect(getFacilitySpecs('shower')).toEqual({ output: 1 });
  });
});

describe('getApartmentSpecs', () => {
  test('should return the correct spec for the type', () => {
    expect(getApartmentSpecs('small')).toEqual({
      facilities: [
        { type: 'sink', quantity: 1 },
        { type: 'shower', quantity: 1 },
      ],
    });
  });
});
