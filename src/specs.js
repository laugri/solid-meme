// @flow

import data from './data.json';

export type FacilityType = 'sink' | 'shower' | 'bathtub' | 'jacuzzi';
export type Facility = { output: number };
export type ApartmentType = 'small' | 'large';
export type ApartmentFacility = { type: FacilityType, quantity: number };
export type Apartment = { facilities: Array<ApartmentFacility> };

export function getFacilitySpecs(facilityType: FacilityType): Facility {
  return data.facilities[facilityType];
}

export function getApartmentSpecs(apartmentType: ApartmentType): Apartment {
  return data.apartments[apartmentType];
}
