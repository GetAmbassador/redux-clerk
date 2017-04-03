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

  // Return the property
  // We try the provided value as well as the value cast to integer
  // This allows string or integer uids to work
  return baseState.getIn(['raw', uid]) || baseState.getIn(['raw', +uid])
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

  // Return the property with pending updates
  // We try the provided value as well as the value cast to integer
  // This allows string or integer uids to work
  const rawItem = baseState.getIn(['raw', uid]) || baseState.getIn(['raw', +uid])
  const pendingRawItem = baseState.getIn(['pendingRaw', uid]) || baseState.getIn(['pendingRaw', +uid])

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

  return Map({
    pendingCreate: baseState.getIn(['pending', 'create'], List()).indexOf(uid) > -1,
    pendingUpdate: baseState.getIn(['pending', 'update'], List()).indexOf(uid) > -1,
    pendingRemove: baseState.getIn(['pending', 'remove'], List()).indexOf(uid) > -1
  })
}
