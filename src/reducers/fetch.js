import normalize from '../utils/normalize'
import Immutable from 'immutable'

/**
 * The start action for the fetch reducer
 * @param  {Immutable.Map} state - current reducer state
 *
 * @return {Immutable.Map} - updated state
 */
export const start = (state) => {
  // Currently we do nothing on start
  // Eventually we'll set a loading state to true
  return state
}

/**
 * The success action for the fetch reducer
 * @param  {Immutable.Map} state - current reducer state
 * @param  {Object} action - action object
 *
 * @return {Immutable.Map} - updated state
 */
export const success = (state, action) => {
  return state.withMutations(map => {

    // If the returned data is an array we normalize and add each item
    if(action.responseData && action.responseData instanceof Array) {

      // Merge new raw data with existing raw data
      const normalizedData = normalize(action.uidField, Immutable.fromJS(action.responseData))
      map.set('raw', state.get('raw').merge(normalizedData))

      // Update instance array with new data
      const instanceData = Immutable.fromJS(action.responseData.map(i => i[action.uidField]))

      // Append if options.appendResponse is true
      if(action.options.appendResponse) {
        const existingInstanceData = map.getIn(['instances', action.instance, 'data'])
        map.setIn(['instances', action.instance, 'data'], existingInstanceData.concat(instanceData))
      }
      // Otherwise we replace the data with the fetch response
      else {
        map.setIn(['instances', action.instance, 'data'], instanceData)
      }

    }
  })
}

/**
 * The error action for the fetch reducer
 * @param  {Immutable.Map} state - current reducer state
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
