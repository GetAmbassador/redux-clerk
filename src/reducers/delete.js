import { Map } from 'immutable'

/**
 * The start action for the delete reducer
 * @param  {Immutable.Map} state - current reducer state
 * @param  {Object} action - action object
 *
 * @return {Immutable.Map} - updated state
 */
export const start = (state, action) => {

  // Get item that is being deleted
  const itemPendingDelete = Map([[action.uid, state.getIn(['raw', action.uid])]])

  return state.withMutations(map => {
    // Optimistically delete the item
    map.deleteIn(['raw', action.uid])

    // Saving the item being deleted in case deletion fails
    map.set('pendingDelete', state.get('pendingDelete').merge(itemPendingDelete))
  })
}

/**
 * The success action for the delete reducer
 * @param  {Immutable.Map} state - current reducer state
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
  const deletedRecord = Map([[action.uid, state.getIn(['pendingDelete', action.uid])]])
  return state.set('raw', state.get('raw').merge(deletedRecord))
}

export default {
  start,
  success,
  error
}
