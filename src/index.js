// @flow

import type { ApartmentType, Apartment, ApartmentFacility } from './specs.js';
import { getApartmentSpecs, getFacilitySpecs } from './specs.js';

type Building = {
  name: string,
  floors: number,
  apartmentType: ApartmentType,
  apartmentsPerFloor: number,
  customApartments: Array<CustomApartment>,
};

type CustomApartment = Apartment & {
  floorNumber: number,
  apartmentNumber: number,
};

export function buildResidenceOutputMap(buildings: Array<Building>) {
  const residenceOutputMap = { buildings: [], total: 0 };
  buildings.reduce((acc, building) => {
    const buildingMap = buildBuildingOutputMap(building);
    acc.buildings.push(buildingMap);
    acc.total += buildingMap.total;
    return acc;
  }, residenceOutputMap);
  return residenceOutputMap;
}

export function buildBuildingOutputMap(building: Building) {
  const buildingMap = {
    total: 0,
    name: building.name,
    floors: [],
  };
  for (let i = 1; i <= building.floors; i++) {
    const floorMap = buildFloorOutputMap(
      i,
      building.apartmentType,
      building.apartmentsPerFloor,
      building.customApartments
    );
    buildingMap.floors.push(floorMap);
    buildingMap.total += floorMap.total;
  }
  return buildingMap;
}

export function buildFloorOutputMap(
  floorNumber: number,
  apartmentType: ApartmentType,
  numberOfApartments: number,
  customApartments: Array<CustomApartment> = []
) {
  const floorMap = { number: floorNumber, apartments: [], total: 0 };
  for (let i = 1; i <= numberOfApartments; i++) {
    const customApartment = findCustomApartment(
      customApartments,
      floorNumber,
      i
    );
    const apartmentOutput = computeApartmentOutput(
      customApartment || getApartmentSpecs(apartmentType)
    );
    floorMap.apartments.push({
      number: i,
      total: apartmentOutput,
    });
    floorMap.total += apartmentOutput;
  }
  return floorMap;
}

export function computeApartmentOutput(apartmentSpecs: Apartment): number {
  return apartmentSpecs.facilities.reduce(
    (outputAcc: number, facility: ApartmentFacility): number => {
      return (
        outputAcc + getFacilitySpecs(facility.type).output * facility.quantity
      );
    },
    0
  );
}

export function findCustomApartment(
  apartmentList: Array<CustomApartment>,
  floorNumber: number,
  apartmentNumber: number
): ?CustomApartment {
  return apartmentList.find((apartment: CustomApartment) => {
    return (
      apartment.floorNumber === floorNumber &&
      apartment.apartmentNumber === apartmentNumber
    );
  });
}
