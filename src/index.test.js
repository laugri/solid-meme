// @flow

import {
  computeApartmentOutput,
  buildFloorOutputMap,
  buildBuildingOutputMap,
  buildResidenceOutputMap,
} from './index';
import data from './data.json';
import output from './output.json';

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

describe('buildResidenceOutputMap', () => {
  test('should output an object with consumption for all levels in the residence', () => {
    expect(buildResidenceOutputMap(data.buildings)).toEqual(output);
  });
});

describe('buildBuildingOutputMap', () => {
  test('should output an object with detailed consumption for the building', () => {
    const mockBuilding = {
      name: 'B',
      floors: 1,
      apartmentType: 'small',
      apartmentsPerFloor: 1,
    };
    expect(buildBuildingOutputMap(mockBuilding)).toEqual({
      total: 3,
      name: 'B',
      floors: [
        {
          number: 1,
          total: 3,
          apartments: [{ number: 1, total: 3 }],
        },
      ],
    });
  });
});

describe('buildFloorOutputMap', () => {
  test('should output an object with detailed consumption for the floor', () => {
    expect(buildFloorOutputMap(1, 'small', 1)).toEqual({
      number: 1,
      total: 3,
      apartments: [{ number: 1, total: 3 }],
    });

    expect(buildFloorOutputMap(4, 'large', 3)).toEqual({
      number: 4,
      total: 27,
      apartments: [
        { number: 1, total: 9 },
        { number: 2, total: 9 },
        { number: 3, total: 9 },
      ],
    });
  });
});
