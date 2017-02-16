/**
 * The selector for retrieving a single record
 * @param  {Object} config - selector configuration
 * @param  {Immutable.Map} state - current reducer state
 * @param  {Number} uid - id of the record
 *
 * @return {*} - the item
 */
export const recordSelector = (config, state, uid) => {

  // Get redux-clerk data from store
  const baseState = config.baseSelector(state)

  // Return the property
  return baseState.getIn(['raw', uid])
}
