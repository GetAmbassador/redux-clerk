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

    // Create reference to raw item that is being removed
    // We also include the instance indices found above
    // The raw object and instance indices will be used in the error action to restore the deleted item
    const itemPendingRemovalData = Map({ instanceIndices: instanceIndices, data: state.getIn(['raw', action.uid]) })
    const itemPendingRemovalTuple = Map([[action.uid, itemPendingRemovalData]])

    // Saving the item being removed in case deletion fails
    map.set('pendingRemoval', state.get('pendingRemoval').merge(itemPendingRemovalTuple))
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
  const removedInstanceIndices = removedRecord.get('instanceIndices')

  return state.withMutations(map => {
    // Remove the item pending removal
    map.deleteIn(['pendingRemoval', action.uid])

    // Re-add the removed item to raw
    map.set('raw', state.get('raw').merge(removedRecordTuple))

    // Re-add the removed item to each instance
    removedInstanceIndices.forEach(item => {
      const instanceKey = item.get('instance')
      const instanceData = map.getIn(['instances', instanceKey, 'data'])
      const itemIndex = item.get('index')
      map.setIn(['instances', instanceKey, 'data'], instanceData.insert(itemIndex, action.uid))
    })
  })
}

export default {
  start,
  success,
  error
}
