import Immutable from 'immutable'

/**
 * Takes an array of objects and normalizes into an Immutable Map
 * using the provided idField as the key
 * @param  {String} uidField - name of the id field in the object
 * @param  {Immutable.List} data - List of Maps
 *
 * @return {Immutable.Map} - Map of normalized data
 */
const normalize = (uidField, data) => {
  return Immutable.Map(data.map(i => [i.get(uidField), i]))
}

export default normalize
