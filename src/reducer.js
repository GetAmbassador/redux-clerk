import Immutable, { Map } from 'immutable'
import { generateActionNames } from './utils/actionNames'
import { createReducer, fetchReducer, updateReducer, deleteReducer } from './reducers'

/**
 * Creates a reducer with the provided config
 * @param  {Object} config - reducer configuration
 *
 * @return {Function} - Reducer function
 */
const reducer = (config) => {

  if (!config) throw new Error('clerk.reducer: Expected config')
  if (!config.actionPrefix) throw new Error('clerk.reducer: Expected actionPrefix')
  if (!config.uidField) throw new Error('clerk.reducer: Expected uidField')

  // Generate action names for create, fetch, update, delete
  const createActions = generateActionNames(config.actionPrefix, 'create')
  const fetchActions = generateActionNames(config.actionPrefix, 'fetch')
  const updateActions = generateActionNames(config.actionPrefix, 'update')
  const deleteActions = generateActionNames(config.actionPrefix, 'delete')

  const defaultState = Immutable.fromJS({

    // raw: Contains raw data objects
    // {
    //   123: { ... },
    //   234: { ... }
    // }
    raw: {},

    // pendingDelete: Contains items that are pending deletion
    pendingDelete: {},

    // pendingUpdate: Contains items that are pending update
    pendingUpdate: {}
  })

  // Clerk reducer
  return (state = new Map({}), action) => {

    // Extend existing state
    // This comes into play when clerk is used to extend an existing reducer
    state = state.merge(defaultState)

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
      case deleteActions.start: return deleteReducer.start(state, action)
      case deleteActions.success: return deleteReducer.success(state, action)
      case deleteActions.error: return deleteReducer.error(state, action)
      default: return state
    }
  }
}

export default reducer
