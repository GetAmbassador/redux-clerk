import Immutable from 'immutable'

/**
 * The start action for the delete reducer
 * @param  {Immutable.Map} state - reducer configuration
 * @param  {Object} action - action object
 *
 * @return {Immutable.Map} - updated state
 */
export const start = (state, action) => {
  return state.deleteIn(['raw', action.uid.toString()])
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
 * @param  {Immutable.Map} state - reducer configuration
 * @param  {Object} action - action object
 *
 * @return {Immutable.Map} - updated state
 */
export const error = (state, action) => {
  // Re-add the record on error because the request failed
  return state.setIn(['raw', action.data.deleted.get(action.uidField)], Immutable.fromJS(action.data.deleted))
}

export default {
  start,
  success,
  error
}
