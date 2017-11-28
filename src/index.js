import data from './data.json';

const apartmentsSpec = data.apartments;
const facilitiesSpec = data.facilities;

export function computeSmallApartmentOutput() {
  return apartmentsSpec.small.facilities.reduce((outputAcc, facility) => {
    return outputAcc + facilitiesSpec[facility.type].output * facility.quantity;
  }, 0);
}
