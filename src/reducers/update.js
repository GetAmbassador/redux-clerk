import { Map, List } from 'immutable'

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
    if (action.isAsync) {
      // Add updated item to pendingRaw
      map.setIn(['pendingRaw', uid], updatedRecord)

      // Add uid to pending.update
      const pendingUpdate = map.getIn(['pending', 'update'], List())
      map.setIn(['pending', 'update'], pendingUpdate.insert(0, uid))
    }
    else {
      // Optimistically update the record
      map.set('raw', state.get('raw').merge(updatedRecordTuple))
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

   return state.withMutations(map => {
    // Update the record in raw
    const updatedRecord = map.getIn(['pendingRaw', uid], Map())
    const updatedRecordTuple = Map([[uid, updatedRecord]])
    map.set('raw', state.get('raw').merge(updatedRecordTuple))

    // Remove the item from pendingRaw
    map.removeIn(['pendingRaw', uid])

    // Remove uid from pending.update
    const pendingUpdate = map.getIn(['pending', 'update'], List())
    const uidIndexInPendingUpdate = pendingUpdate.indexOf(uid)
    map.removeIn(['pending', 'update', uidIndexInPendingUpdate])
   })
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

  return state.withMutations(map => {
    // Remove the item from pendingRaw
    map.removeIn(['pendingRaw', uid])

    // Remove uid from pending.update
    const pendingUpdate = map.getIn(['pending', 'update'], List())
    const uidIndexInPendingUpdate = pendingUpdate.indexOf(uid)
    map.removeIn(['pending', 'update', uidIndexInPendingUpdate])
  })
}

export default {
  start,
  success,
  error
}
