import { Map, List } from 'immutable'

/**
 * The start action for the remove reducer
 * @param  {Immutable.Map} state - current reducer state
 * @param  {Object} action - action object
 *
 * @return {Immutable.Map} - updated state
 */
export const start = (state, action) => {
  return state.withMutations(map => {
    // Pessimistic removal
    if (action.isAsync) {
      // Add uid to pending.remove
      const pendingRemove = map.getIn(['pending', 'remove'], List())
      map.setIn(['pending', 'remove'], pendingRemove.insert(0, action.uid))
    }
    // Optimistic removal
    else {
      // Optimistically remove the item
      map.deleteIn(['raw', action.uid])

      // Keep a reference to the index of the removed item in each instance
      let instanceIndices = List()
      map.get('instances').entrySeq().forEach(item => {
        const instanceKey = item[0]
        const instanceUids = item[1].get('data')
        const uidIndexInInstance = instanceUids.indexOf(action.uid)

        // If the uid of the item to be removed exists in this instance
        // we save the index. This allows us to re-add the item later
        // if the removal is unsuccessful.
        if(uidIndexInInstance > -1) {
          instanceIndices = instanceIndices.push(Map({ instance: instanceKey, index: uidIndexInInstance }))

          // Once reference is saved we can remove the item from the instance
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
    // Remove uid from pending.remove
    const pendingRemove = map.getIn(['pending', 'remove'], List())
    const uidIndexInPendingRemove = pendingRemove.indexOf(action.uid)
    map.removeIn(['pending', 'remove', uidIndexInPendingRemove])

    // Remove the item from raw
    map.deleteIn(['raw', action.uid])

    // Keep a reference to the index of the removed item in each instance
    let instanceIndices = List()
    map.get('instances').entrySeq().forEach(item => {
      const instanceKey = item[0]
      const instanceUids = item[1].get('data')
      const uidIndexInInstance = instanceUids.indexOf(action.uid)

      // If the uid of the item to be removed exists in this instance
      // we save the index. This allows us to re-add the item later
      // if the removal is unsuccessful.
      if(uidIndexInInstance > -1) {
        instanceIndices = instanceIndices.push(Map({ instance: instanceKey, index: uidIndexInInstance }))

        // Once reference is saved we can remove the item from the instance
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
  return state.withMutations(map => {
    // Remove uid from pending.remove
    const pendingRemove = map.getIn(['pending', 'remove'], List())
    const uidIndexInPendingRemove = pendingRemove.indexOf(action.uid)
    map.removeIn(['pending', 'remove', uidIndexInPendingRemove])
  })
}

export default {
  start,
  success,
  error
}
