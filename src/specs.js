// @flow

import data from './data.json';

export type FacilityType = 'sink' | 'shower' | 'bathtub';
export type FacilitySpecs = { output: number };
export type ApartmentType = 'small' | 'large';
export type ApartmentFacility = { type: FacilityType, quantity: number };
export type ApartmentSpecs = { facilities: Array<ApartmentFacility> };

export function getFacilitySpecs(facilityType: FacilityType): FacilitySpecs {
  return data.facilities[facilityType];
}

export function getApartmentSpecs(
  apartmentType: ApartmentType
): ApartmentSpecs {
  return data.apartments[apartmentType];
}
