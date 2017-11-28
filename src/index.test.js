// @flow

import {
  computeApartmentOutput,
  buildFloorOutputMap,
  buildBuildingOutputMap,
  buildResidenceOutputMap,
  findCustomApartment,
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

describe('findCustomApartment', () => {
  const customApartment1 = {
    floorNumber: 2,
    apartmentNumber: 1,
    facilities: [
      { type: 'sink', quantity: 2 },
      { type: 'bathtub', quantity: 1 },
      { type: 'jacuzzi', quantity: 1 },
    ],
  };
  const customApartment2 = {
    floorNumber: 2,
    apartmentNumber: 3,
    facilities: [
      { type: 'sink', quantity: 1 },
      { type: 'shower', quantity: 1 },
      { type: 'jacuzzi', quantity: 1 },
    ],
  };
  const apartmentList = [customApartment1, customApartment2];
  test('should return the custom apartment if it exists', () => {
    expect(findCustomApartment(apartmentList, 2, 3)).toEqual(customApartment2);
  });
  test('should return undefined if no custom apartment exists', () => {
    expect(findCustomApartment(apartmentList, 5, 5)).toEqual(undefined);
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
      customApartments: [],
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

  test('should output the building consumption with custom apartments', () => {
    const mockBuilding = {
      name: 'B',
      floors: 1,
      apartmentType: 'small',
      apartmentsPerFloor: 1,
      customApartments: [
        {
          floorNumber: 1,
          apartmentNumber: 1,
          facilities: [
            { type: 'sink', quantity: 2 },
            { type: 'bathtub', quantity: 1 },
            { type: 'jacuzzi', quantity: 1 },
          ],
        },
      ],
    };
    expect(buildBuildingOutputMap(mockBuilding)).toEqual({
      total: 19,
      name: 'B',
      floors: [
        {
          number: 1,
          total: 19,
          apartments: [{ number: 1, total: 19 }],
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

  test('should output an object with detailed consumption for the floor using cutstom specs', () => {
    expect(
      buildFloorOutputMap(4, 'large', 3, [
        {
          floorNumber: 4,
          apartmentNumber: 1,
          facilities: [
            { type: 'sink', quantity: 2 },
            { type: 'bathtub', quantity: 1 },
            { type: 'jacuzzi', quantity: 1 },
          ],
        },
      ])
    ).toEqual({
      number: 4,
      total: 37,
      apartments: [
        { number: 1, total: 19 },
        { number: 2, total: 9 },
        { number: 3, total: 9 },
      ],
    });
  });
});
