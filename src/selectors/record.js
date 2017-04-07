import { Map, List } from 'immutable'

/**
 * The selector for retrieving a single record without pending updates
 * @param  {Object} config - selector configuration
 * @param  {Immutable.Map} state - current reducer state
 * @param  {Number} uid - id of the record
 *
 * @return {Object} - the record
 */
export const recordSelector = (config, state, uid) => {

  // Get redux-clerk data from store
  const baseState = config.baseSelector(state)

  // Convert provided uid to string since we normalize raw with string keys
  const uidString = uid.toString()

  // Return the property
  // We try the provided value as well as the value cast to integer
  // This allows string or integer uids to work
  return baseState.getIn(['raw', uidString])
}

/**
 * The selector for retrieving a single record with pending updates
 * @param  {Object} config - selector configuration
 * @param  {Immutable.Map} state - current reducer state
 * @param  {Number} uid - id of the record
 *
 * @return {Object} - the record
 */
export const recordOptimisticSelector = (config, state, uid) => {

  // Get redux-clerk data from store
  const baseState = config.baseSelector(state)

  // Convert provided uid to string since we normalize raw with string keys
  const uidString = uid.toString()

  // Return the property with pending updates
  // We try the provided value as well as the value cast to integer
  // This allows string or integer uids to work
  const rawItem = baseState.getIn(['raw', uidString])
  const pendingRawItem = baseState.getIn(['pendingRaw', uidString])

  return rawItem && rawItem.merge(pendingRawItem)
}

/**
 * The selector for retrieving a single record's pending states
 * @param  {Object} config - selector configuration
 * @param  {Immutable.Map} state - current reducer state
 * @param  {Number} uid - id of the record
 *
 * @return {Object} - the record's pending states
 */
export const recordStateSelector = (config, state, uid) => {

  // Get redux-clerk data from store
  const baseState = config.baseSelector(state)

  // Convert provided uid to string since we normalize raw with string keys
  const uidString = uid.toString()

  return Map({
    pendingCreate: baseState.getIn(['pending', 'create'], List()).indexOf(uidString) > -1,
    pendingUpdate: baseState.getIn(['pending', 'update'], List()).indexOf(uidString) > -1,
    pendingRemove: baseState.getIn(['pending', 'remove'], List()).indexOf(uidString) > -1
  })
}
