import Immutable, { Map, List } from 'immutable'

/**
 * The start action for the create reducer
 * @param  {Immutable.Map} state - current reducer state
 * @param  {Object} action - action object
 *
 * @return {Immutable.Map} - updated state
 */
export const start = (state, action) => {

  // Get temporary uid from new record
  const uid = action.record.get(action.uidField).toString()

  // Create new record tuple
  // We have to create a tuple here in order to preserve the Integer typed keys
  const newRecord = Map([[uid, action.record]])

  // Update state
  return state.withMutations(map => {

    // Add full object to raw
    map.set('raw', state.get('raw').merge(newRecord))

    // Add uid to provided instance
    const instanceData = map.getIn(['instances', action.instance, 'data'], List())
    map.setIn(['instances', action.instance, 'data'], instanceData.insert(0, uid))

    if (action.isAsync) {
      // Add uid to pending.create
      const pendingCreate = map.getIn(['pending', 'create'], List())
      map.setIn(['pending', 'create'], pendingCreate.insert(0, uid))
    }

    // Add additional data if provided
    if(action.additionalData) {
      map.mergeIn(['instances', action.instance, 'additionalData'], Immutable.fromJS(action.additionalData))
    }
  })
}

/**
 * The success action for the create reducer
 * @param  {Immutable.Map} state - current reducer state
 * @param  {Object} action - action object
 *
 * @return {Immutable.Map} - updated state
 */
export const success = (state, action) => {

  // Update state
  return state.withMutations(map => {

    // Add new record to raw using permanent uid
    const permanentUid = action.responseData[action.uidField].toString()
    const newRecord = Map([[permanentUid, action.responseData]])
    map.set('raw', state.get('raw').merge(newRecord))

    // Add new record to instance array using permanent uid
    map.setIn(['instances', action.instance, 'data'], map.getIn(['instances', action.instance, 'data']).insert(0, permanentUid))

    // Remove temporary record from raw
    const temporaryUid = action.record.get(action.uidField).toString()
    map.removeIn(['raw', temporaryUid])

    // Remove temporary uid from provided instance
    const instanceUids = map.getIn(['instances', action.instance, 'data'], List())
    const temporaryUidIndexInInstance = instanceUids.indexOf(temporaryUid)
    map.removeIn(['instances', action.instance, 'data', temporaryUidIndexInInstance])

    // Remove temporary uid from pending.create
    const pendingCreate = map.getIn(['pending', 'create'], List())
    const temporaryUidIndexInPendingCreate = pendingCreate.indexOf(temporaryUid)
    map.removeIn(['pending', 'create', temporaryUidIndexInPendingCreate])

    // Add additional data if provided
    if(action.additionalData) {
      map.mergeIn(['instances', action.instance, 'additionalData'], Immutable.fromJS(action.additionalData))
    }
  })
}

/**
 * The error action for the create reducer
 * @param  {Immutable.Map} state - current reducer state
 * @param  {Object} action - action object
 *
 * @return {Immutable.Map} - updated state
 */
export const error = (state, action) => {

  // Update state
  return state.withMutations(map => {

    // Remove the added record on error because the request failed
    const temporaryUid = action.record.get(action.uidField).toString()
    map.removeIn(['raw', temporaryUid])

    // Remove temporary uid from provided instance
    const instanceUids = map.getIn(['instances', action.instance, 'data'], List())
    const temporaryUidIndexInInstance = instanceUids.indexOf(temporaryUid)
    map.removeIn(['instances', action.instance, 'data', temporaryUidIndexInInstance])

    // Remove temporary uid from pending.create
    const pendingCreate = map.getIn(['pending', 'create'], List())
    const temporaryUidIndexInPendingCreate = pendingCreate.indexOf(temporaryUid)
    map.removeIn(['pending', 'create', temporaryUidIndexInPendingCreate])

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
