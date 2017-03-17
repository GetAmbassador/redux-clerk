import Immutable, { Map } from 'immutable'

/**
 * The start action for the remove reducer
 * @param  {Immutable.Map} state - current reducer state
 * @param  {Object} action - action object
 *
 * @return {Immutable.Map} - updated state
 */
export const start = (state, action) => {

  return state.withMutations(map => {
    // Optimistically remove the item
    map.deleteIn(['raw', action.uid])

    // Remove uid from instance array
    const uidIndex = map.getIn(['instances', action.instance, 'data']).findIndex(uid => uid === action.uid)
    map.removeIn(['instances', action.instance, 'data', uidIndex])

    // Get item that is being removed
    const itemPendingRemovalData = Map({ index: uidIndex, data: state.getIn(['raw', action.uid]) })
    const itemPendingRemovalTuple = Map([[action.uid, itemPendingRemovalData]])

    // Saving the item being removed in case deletion fails
    map.set('pendingRemoval', state.get('pendingRemoval').merge(itemPendingRemovalTuple))

    // Add additional data if provided
    if(action.additionalData) {
      map.mergeIn(['instances', action.instance, 'additionalData'], Immutable.fromJS(action.additionalData))
    }
  })
}

/**
 * The success action for the remove reducer
 * @param  {Immutable.Map} state - current reducer state
 * @param  {Object} action - action object
 *
 * @return {Immutable.Map} - updated state
 */
export const success = (state, action) => {
  return state.withMutations(map => {

    // Remove the item pending removal
    map.deleteIn(['pendingRemoval', action.uid])

    // Add additional data if provided
    if(action.additionalData) {
      map.mergeIn(['instances', action.instance, 'additionalData'], Immutable.fromJS(action.additionalData))
    }
  })
}

/**
 * The error action for the remove reducer
 * Re-adds the record on error because the request failed
 * @param  {Immutable.Map} state - current reducer state
 * @param  {Object} action - action object
 *
 * @return {Immutable.Map} - updated state
 */
export const error = (state, action) => {
  // Create reverted record tuple
  // We have to create a tuple here in order to preserve the Integer typed keys
  const removedRecord = state.getIn(['pendingRemoval', action.uid])
  const removedRecordTuple = Map([[action.uid, removedRecord.get('data')]])
  return state.withMutations(map => {
    // Remove the item pending removal
    map.deleteIn(['pendingRemoval', action.uid])

    // Re-add the removed items
    map.set('raw', state.get('raw').merge(removedRecordTuple))
    map.setIn(['instances', action.instance, 'data'], map.getIn(['instances', action.instance, 'data']).insert(removedRecord.get('index'), action.uid))

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
