import Immutable, { Map } from 'immutable'
import { generateActionNames } from '../utils/actionNames'
import createReducer from './create'
import fetchReducer from './fetch'
import updateReducer from './update'
import removeReducer from './remove'

/**
 * Creates a reducer with the provided config
 * @param  {Object} config - reducer configuration
 *
 * @return {Function} - Reducer function
 */
const reducer = (config) => {

  if (!config) throw new Error('clerk.reducer: Expected config')
  if (!config.actionPrefix) throw new Error('clerk.reducer: Expected actionPrefix')

  // Generate action names for create, fetch, update, remove
  const createActions = generateActionNames(config.actionPrefix, 'create')
  const fetchActions = generateActionNames(config.actionPrefix, 'fetch')
  const updateActions = generateActionNames(config.actionPrefix, 'update')
  const removeActions = generateActionNames(config.actionPrefix, 'remove')

  const defaultState = Immutable.fromJS({

    // raw: Contains raw data objects
    // {
    //   123: { ... },
    //   234: { ... }
    // }
    raw: {},

    // pendingRaw: Contains pending updates made to data objects
    // {
    //   123: { ... },
    //   234: { ... }
    // }
    pendingRaw: {},

    // Holds uids of pending items
    // {
    //   create: [123],
    //   update: [234, 345],
    //   remove: [456]
    // }
    pending: {
      create: [],
      update: [],
      remove: []
    },

    // Holds derived subsets of the raw data
    // Stored as arrays of uids
    // {
    //   instance1: { data: [123, 234] },
    //   instance2: { [234,345,456] }
    // }
    instances: {},

    // pendingRemoval: Contains items that are pending removal
    pendingRemoval: {},

    // pendingUpdate: Contains items that are pending update
    pendingUpdate: {}
  })

  // Clerk reducer
  return (state = new Map({}), action) => {

    // Extend existing state
    // This comes into play when clerk is used to extend an existing reducer
    // We use mergeWith so that our default state doesn't blow away any exiting values
    state = state.mergeWith(a => {
      return a
    }, defaultState)

    switch(action.type) {
      case fetchActions.start: return fetchReducer.start(state, action)
      case fetchActions.success: return fetchReducer.success(state, action)
      case fetchActions.error: return fetchReducer.error(state, action)
      case createActions.start: return createReducer.start(state, action)
      case createActions.success: return createReducer.success(state, action)
      case createActions.error: return createReducer.error(state, action)
      case updateActions.start: return updateReducer.start(state, action)
      case updateActions.success: return updateReducer.success(state, action)
      case updateActions.error: return updateReducer.error(state, action)
      case removeActions.start: return removeReducer.start(state, action)
      case removeActions.success: return removeReducer.success(state, action)
      case removeActions.error: return removeReducer.error(state, action)
      default: return state
    }
  }
}

export default reducer
