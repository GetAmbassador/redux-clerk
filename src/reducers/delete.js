import { Map } from 'immutable'

/**
 * The start action for the delete reducer
 * @param  {Immutable.Map} state - current reducer state
 * @param  {Object} action - action object
 *
 * @return {Immutable.Map} - updated state
 */
export const start = (state, action) => {

  return state.withMutations(map => {
    // Optimistically delete the item
    map.deleteIn(['raw', action.uid])

    // Remove uid from instance array
    const uidIndex = map.getIn(['instances', action.instance, 'data']).findIndex(uid => uid === action.uid)
    map.removeIn(['instances', action.instance, 'data', uidIndex])

    // Get item that is being deleted
    const itemPendingDeleteData = Map({ index: uidIndex, data: state.getIn(['raw', action.uid]) })
    const itemPendingDeleteTuple = Map([[action.uid, itemPendingDeleteData]])

    // Saving the item being deleted in case deletion fails
    map.set('pendingDelete', state.get('pendingDelete').merge(itemPendingDeleteTuple))
  })
}

/**
 * The success action for the delete reducer
 * @param  {Immutable.Map} state - current reducer state
 * @param  {Object} action - action object
 *
 * @return {Immutable.Map} - updated state
 */
export const success = (state, action) => {
  // Remove the item pending delete
  return state.deleteIn(['pendingDelete', action.uid])
}

/**
 * The error action for the delete reducer
 * Re-adds the record on error because the request failed
 * @param  {Immutable.Map} state - current reducer state
 * @param  {Object} action - action object
 *
 * @return {Immutable.Map} - updated state
 */
export const error = (state, action) => {
  // Create reverted record tuple
  // We have to create a tuple here in order to preserve the Integer typed keys
  const deletedRecord = state.getIn(['pendingDelete', action.uid])
  const deletedRecordTuple = Map([[action.uid, deletedRecord.get('data')]])
  return state.withMutations(map => {
    // Remove the item pending delete
    map.deleteIn(['pendingDelete', action.uid])

    // Re-add the deleted items
    map.set('raw', state.get('raw').merge(deletedRecordTuple))
    map.setIn(['instances', action.instance, 'data'], map.getIn(['instances', action.instance, 'data']).insert(deletedRecord.get('index'), action.uid))
  })
}

export default {
  start,
  success,
  error
}
