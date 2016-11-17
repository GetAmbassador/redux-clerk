import { Map } from 'immutable'

/**
 * The start action for the create reducer
 * @param  {Immutable.Map} state - current reducer state
 * @param  {Object} action - action object
 *
 * @return {Immutable.Map} - updated state
 */
export const start = (state, action) => {

  // Get temporary uid from new record
  const uid = action.record.get(action.uidField)

  // Create new record tuple
  // We have to create a tuple here in order to preserve the Integer typed keys
  const newRecord = Map([[uid, action.record]])

  // Update state
  return state.withMutations(map => {

    // Add full object to raw
    map.set('raw', state.get('raw').merge(newRecord))

    // Add uid to provided instance
    map.setIn(['instances', action.instance, 'data'], map.getIn(['instances', action.instance, 'data']).insert(0, uid))
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

    // Add new record to raw using permananet uid
    const permanentUid = action.responseData[action.uidField]
    const newRecord = Map([[permanentUid, action.record.set(action.uidField, permanentUid)]])
    map.set('raw', state.get('raw').merge(newRecord))

    // Add new record to instance array using permanaent uid
    map.setIn(['instances', action.instance, 'data'], map.getIn(['instances', action.instance, 'data']).insert(0, permanentUid))

    // Remove temporary record from raw
    const temporaryUid = action.record.get(action.uidField)
    map.removeIn(['raw', temporaryUid])

    // Remove temporary uid from instance array
    const temporaryUidIndex = map.getIn(['instances', action.instance, 'data']).findIndex(uid => uid === temporaryUid)
    map.removeIn(['instances', action.instance, 'data', temporaryUidIndex])
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
    map.removeIn(['raw', action.record.get(action.uidField)])

    // Remove temporary uid from instance array
    const temporaryUid = action.record.get(action.uidField)
    const temporaryUidIndex = map.getIn(['instances', action.instance, 'data']).findIndex(uid => uid === temporaryUid)
    map.removeIn(['instances', action.instance, 'data', temporaryUidIndex])
  })
}

export default {
  start,
  success,
  error
}
