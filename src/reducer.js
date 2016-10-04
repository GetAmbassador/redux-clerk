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
  if (!config.eventPrefix) throw new Error('clerk.reducer: Expected eventPrefix')
  if (!config.uidField) throw new Error('clerk.reducer: Expected uidField')

  // Generate action names for create, fetch, update, delete
  const createActions = generateActionNames(config.eventPrefix, 'create')
  const fetchActions = generateActionNames(config.eventPrefix, 'fetch')
  const updateActions = generateActionNames(config.eventPrefix, 'update')
  const deleteActions = generateActionNames(config.eventPrefix, 'delete')

  const defaultState = Immutable.fromJS({

    // raw: Contains raw data objects
    // {
    //   123: { ... },
    //   234: { ... }
    // }
    raw: {}
  })

  // Clerk reducer
  return (state = new Map({}), action) => {

    // Extend existing state
    // This comes into play when clerk is used to extend an existing reducer
    state = state.merge(defaultState)

    switch(action.type) {
      case fetchActions.success: return fetchReducer.success(state, action)
      case createActions.start: return createReducer.start(state, action)
      case updateActions.start: return updateReducer.start(state, action)
      case deleteActions.start: return deleteReducer.start(state, action)
      default: return state
    }
  }
}

export default reducer
