/**
 * The selector for retrieving a single record
 * @param  {Object} config - selector configuration
 * @param  {Immutable.Map} state - current reducer state
 * @param  {Number} uid - id of the record
 *
 * @return {Object} - the record
 */
export const recordSelector = (config, state, uid) => {

  // Get redux-clerk data from store
  const baseState = config.baseSelector(state)

  // Return the property
  // We try the provided value as well as the value cast to integer
  // This allows string or integer uids to work
  return baseState.getIn(['raw', uid]) || baseState.getIn(['raw', +uid])
}
