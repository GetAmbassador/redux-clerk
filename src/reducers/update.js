import { Map } from 'immutable'

/**
 * The start action for the update reducer
 * @param  {Immutable.Map} state - reducer configuration
 * @param  {Object} action - action object
 *
 * @return {Immutable.Map} - updated state
 */
export const start = (state, action) => {

  // Create updated record tuple
  // We have to create a tuple here in order to preserve the Integer typed keys
  const updatedRecord = Map([[action.data.get(action.uidField), action.data]])
  return state.set('raw', state.get('raw').merge(updatedRecord))
}

/**
 * The success action for the update reducer
 * @param  {Immutable.Map} state - reducer configuration
 *
 * @return {Immutable.Map} - updated state
 */
export const success = (state) => {
  // Currently we do nothing on success because
  // the record is optimisticly updated in the start action.
  // Eventually we'll set a loading state to false
  return state
}

/**
 * The error action for the update reducer
 * Reverts store change on failure
 * @param  {Immutable.Map} state - reducer configuration
 * @param  {Object} action - action object
 *
 * @return {Immutable.Map} - updated state
 */
export const error = (state, action) => {

  // Create reverted record tuple
  // We have to create a tuple here in order to preserve the Integer typped keys
  const updatedRecord = Map([[action.updated.get(action.uidField), action.updated]])
  return state.set('raw', state.get('raw').merge(updatedRecord))
}

export default {
  start,
  success,
  error
}
