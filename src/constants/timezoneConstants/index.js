import _reduce from 'lodash/reduce';
import _map from 'lodash/map';

const timezonesData = require('./timezone');

//to avoid creating anonymous function on every call
function zoneGroupAccumulator(accumulator, zoneGroup) {
  const {zones} = zoneGroup;
  accumulator.push(...zones);
  return accumulator;
}

function mapLocationToOptions(location) {
  return {
    label: location.value,
    value: location.value,
  }
}

/**
 * returns options of the format [{label, value}, ...]
 */
const locationsByTimeZone = (function () {
  const locations = _reduce(
    timezonesData.data,
    zoneGroupAccumulator,
    []
  );
  
  return _map(locations, mapLocationToOptions);
})();

export default locationsByTimeZone;

