// @flow

import data from './data.json';

type FacilityType = 'sink' | 'shower' | 'bathtub';
type ApartmentFacility = { type: FacilityType, quantity: number };
type ApartmentSpecs = { facilities: Array<ApartmentFacility> };

const facilitiesSpecs = data.facilities;

export function computeApartmentOutput(apartmentSpecs: ApartmentSpecs): number {
  return apartmentSpecs.facilities.reduce(
    (outputAcc: number, facility: ApartmentFacility): number => {
      return (
        outputAcc + facilitiesSpecs[facility.type].output * facility.quantity
      );
    },
    0
  );
}
