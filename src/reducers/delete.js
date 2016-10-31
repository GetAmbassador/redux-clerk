import { Map } from 'immutable'

/**
 * The start action for the delete reducer
 * @param  {Immutable.Map} state - reducer configuration
 * @param  {Object} action - action object
 *
 * @return {Immutable.Map} - updated state
 */
export const start = (state, action) => {
  return state.deleteIn(['raw', action.uid])
}

/**
 * The success action for the delete reducer
 * @param  {Immutable.Map} state - reducer configuration
 *
 * @return {Immutable.Map} - updated state
 */
export const success = (state) => {
  // Currently we do nothing on success because
  // the record is optimisticly deleted in the start action.
  // Eventually we'll set a loading state to false
  return state
}

/**
 * The error action for the delete reducer
 * Re-adds the record on error because the request failed
 * @param  {Immutable.Map} state - reducer configuration
 * @param  {Object} action - action object
 *
 * @return {Immutable.Map} - updated state
 */
export const error = (state, action) => {
  // Create reverted record tuple
  // We have to create a tuple here in order to preserve the Integer typped keys
  const deletedRecord = Map([[action.deleted.get(action.uidField), action.deleted]])
  return state.set('raw', state.get('raw').merge(deletedRecord))
}

export default {
  start,
  success,
  error
}
