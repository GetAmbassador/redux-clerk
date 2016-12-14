import { Map } from 'immutable'

/**
 * The start action for the update reducer
 * @param  {Immutable.Map} state - current reducer state
 * @param  {Object} action - action object
 *
 * @return {Immutable.Map} - updated state
 */
export const start = (state, action) => {

  const uid = action.record.get(action.uidField)

  // Get previous record
  const previousRecord = state.getIn(['raw', uid])

  // Create updated record tuple
  // We have to create a tuple here in order to preserve the Integer typed keys
  // If there is no previous record we add a new record
  const updatedRecord = previousRecord ? previousRecord.merge(action.record) : action.record
  const updatedRecordTuple = Map([[uid, updatedRecord]])

  return state.withMutations(map => {
    // Optimistically update the record
    map.set('raw', state.get('raw').merge(updatedRecordTuple))

    if(previousRecord) {
      // Save previous version in case the update fails
      const previousRecordTuple = Map([[uid, previousRecord]])
      map.set('pendingUpdate', state.get('pendingUpdate').merge(previousRecordTuple))
    }
  })
}

/**
 * The success action for the update reducer
 * @param  {Immutable.Map} state - current reducer state
 * @param  {Object} action - action object
 *
 * @return {Immutable.Map} - updated state
 */
 export const success = (state, action) => {

   const uid = action.record.get(action.uidField)

   // Remove the item pending update
   return state.deleteIn(['pendingUpdate', uid])
 }

/**
 * The error action for the update reducer
 * Reverts store change on failure
 * @param  {Immutable.Map} state - current reducer state
 * @param  {Object} action - action object
 *
 * @return {Immutable.Map} - updated state
 */
export const error = (state, action) => {

  const uid = action.record.get(action.uidField)

  // Create reverted record tuple
  // We have to create a tuple here in order to preserve the Integer typped keys
  const updatedRecord = Map([[uid, state.getIn(['pendingUpdate', uid])]])
  return state.withMutations(map => {

    // Revert changes
    if(updatedRecord) {
      map.set('raw', state.get('raw').merge(updatedRecord))
      // Remove the item pending update
      map.deleteIn(['pendingUpdate', uid])
    }
    // If updated record wasn't previously in the store we can remove from raw on failure.
    else {
      map.removeIn(['raw'. uid])
    }
  })
}

export default {
  start,
  success,
  error
}
