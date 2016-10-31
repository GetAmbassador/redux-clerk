import normalize from '../utils/normalize'

/**
 * The start action for the fetch reducer
 * @param  {Immutable.Map} state - reducer configuration
 *
 * @return {Immutable.Map} - updated state
 */
export const start = (state) => {
  // Currently we do nothing on start
  // Eventually we'll set a loading state to false
  return state
}

/**
 * The success action for the fetch reducer
 * @param  {Immutable.Map} state - reducer configuration
 * @param  {Object} action - action object
 *
 * @return {Immutable.Map} - updated state
 */
export const success = (state, action) => {

  // If the returned data is a list we normalize and add each item
  if(action.data && action.data.size) {
    const normalizedData = normalize(action.uidField, action.data)
    return state.set('raw', state.get('raw').merge(normalizedData))
  }

  // Otherwise we update the single object
  return state.setIn(['raw', action.uid, action.data])
}

/**
 * The error action for the fetch reducer
 * @param  {Immutable.Map} state - reducer configuration
 *
 * @return {Immutable.Map} - updated state
 */
export const error = (state) => {
  // Currently we do nothing on error
  // Eventually we'll set a loading state to false
  return state
}

export default {
  start,
  success,
  error
}
