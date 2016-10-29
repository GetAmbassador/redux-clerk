import Immutable from 'immutable'

/**
 * The start action for the create reducer
 * @param  {Immutable.Map} state - reducer configuration
 * @param  {Object} action - action object
 *
 * @return {Immutable.Map} - updated state
 */
export const start = (state, action) => {
  return state.setIn(['raw', action.data.record.get(action.uidField)], Immutable.fromJS(action.data.record))
}

/**
 * The success action for the create reducer
 * @param  {Immutable.Map} state - reducer configuration
 *
 * @return {Immutable.Map} - updated state
 */
export const success = (state) => {
  // Currently we do nothing on success because
  // the record is optimisticly updated in the success action.
  // Eventually we'll set a loading state to false
  return state
}

/**
 * The error action for the create reducer
 * @param  {Immutable.Map} state - reducer configuration
 * @param  {Object} action - action object
 *
 * @return {Immutable.Map} - updated state
 */
export const error = (state, action) => {
  // Remove the added record on error because the request failed
  return state.removeIn(['raw', action.created.get(action.uidField)])
}

export default {
  start,
  success,
  error
}
