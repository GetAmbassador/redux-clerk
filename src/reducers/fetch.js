import normalize from '../utils/normalize'
import { isObject } from '../utils/is'
import Immutable from 'immutable'

/**
 * The start action for the fetch reducer
 * @param  {Immutable.Map} state - current reducer state
 * @param  {Object} action - action object
 *
 * @return {Immutable.Map} - updated state
 */
export const start = (state, action) => {
  return state.withMutations(map => {

    // Add additional data if provided
    if(action.additionalData) {
      map.mergeIn(['instances', action.instance, 'additionalData'], Immutable.fromJS(action.additionalData))
    }
  })
}

/**
 * The success action for the fetch reducer
 * @param  {Immutable.Map} state - current reducer state
 * @param  {Object} action - action object
 *
 * @return {Immutable.Map} - updated state
 */
export const success = (state, action) => {
  let responseData = action.responseData

  return state.withMutations(map => {

    // Do nothing if no response data is provided
    if(!responseData) {
      return
    }

    // Convert responseData to array if object is provided
    if(isObject(responseData)) {
      responseData = [responseData]
    }

    // If the returned data is an array we normalize and add each item
    if(Array.isArray(responseData)) {

      // Merge new raw data with existing raw data
      const normalizedData = normalize(action.uidField, Immutable.fromJS(responseData))
      map.set('raw', map.get('raw').mergeDeep(normalizedData))
    }

    // Update instance array with new data
    const instanceData = Immutable.fromJS(responseData.map(i => i[action.uidField].toString()))

    // Append if options.appendResponse is true
    if(action.options.appendResponse) {
      const existingInstanceData = map.getIn(['instances', action.instance, 'data'])
      map.setIn(['instances', action.instance, 'data'], existingInstanceData.concat(instanceData))
    }
    // Otherwise we replace the data with the fetch response
    else {
      map.setIn(['instances', action.instance, 'data'], instanceData)
    }

    // Add additional data if provided
    if(action.additionalData) {
      map.mergeIn(['instances', action.instance, 'additionalData'], Immutable.fromJS(action.additionalData))
    }
  })
}

/**
 * The error action for the fetch reducer
 * @param  {Immutable.Map} state - current reducer state
 * @param  {Object} action - action object
 *
 * @return {Immutable.Map} - updated state
 */
export const error = (state, action) => {
  return state.withMutations(map => {

    // Add additional data if provided
    if(action.additionalData) {
      map.mergeIn(['instances', action.instance, 'additionalData'], Immutable.fromJS(action.additionalData))
    }
  })
}

export default {
  start,
  success,
  error
}
