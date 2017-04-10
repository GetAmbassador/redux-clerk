import { List } from 'immutable'

/**
 * The start action for the remove reducer
 * @param  {Immutable.Map} state - current reducer state
 * @param  {Object} action - action object
 *
 * @return {Immutable.Map} - updated state
 */
export const start = (state, action) => {
  return state.withMutations(map => {
    const removalId = action.uid.toString()

    // Pessimistic removal
    if (action.isAsync) {
      // Add uid to pending.remove
      const pendingRemove = map.getIn(['pending', 'remove'], List())
      map.setIn(['pending', 'remove'], pendingRemove.insert(0, removalId))
    }
    // Remove the item from raw and all instances
    else {
      // Remove the item from raw
      map.deleteIn(['raw', removalId])

      // Remove uid from all instances
      map.get('instances').entrySeq().forEach(item => {
        const instanceKey = item[0]
        const instanceUids = item[1].get('data')
        const uidIndexInInstance = instanceUids.indexOf(removalId)

        // If the uid of the item to be removed exists in this instance, remove it
        if(uidIndexInInstance > -1) {
          map.removeIn(['instances', instanceKey, 'data', uidIndexInInstance])
        }
      })
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
    const removalId = action.uid.toString()

    // Remove uid from pending.remove
    const pendingRemove = map.getIn(['pending', 'remove'], List())
    const uidIndexInPendingRemove = pendingRemove.indexOf(removalId)
    map.removeIn(['pending', 'remove', uidIndexInPendingRemove])

    // Remove the item from raw
    map.deleteIn(['raw', removalId])

    // Remove uid from all instances
    map.get('instances').entrySeq().forEach(item => {
      const instanceKey = item[0]
      const instanceUids = item[1].get('data')
      const uidIndexInInstance = instanceUids.indexOf(removalId)

      // If the uid of the item to be removed exists in this instance, remove it
      if(uidIndexInInstance > -1) {
        map.removeIn(['instances', instanceKey, 'data', uidIndexInInstance])
      }
    })
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
  const removalId = action.uid.toString()

  return state.withMutations(map => {
    // Remove uid from pending.remove
    const pendingRemove = map.getIn(['pending', 'remove'], List())
    const uidIndexInPendingRemove = pendingRemove.indexOf(removalId)
    map.removeIn(['pending', 'remove', uidIndexInPendingRemove])
  })
}

export default {
  start,
  success,
  error
}
