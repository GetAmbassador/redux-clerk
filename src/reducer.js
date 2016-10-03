import Immutable from 'immutable'
import generateActionSet from '../utils/generateActionSet'
import { createReducer, fetchReducer, updateReducer, deleteReducer } from '../reducers'

const reducer = (config) => {

  if (!config.eventPrefix) throw new Error('clerk.reducer: Expected eventPrefix')
  if (!config.uid) throw new Error('clerk.reducer: Expected uid')

  // Generate action names for create, fetch, update, delete
  const createActions = generateActionSet(config.eventPrefix, 'create')
  const fetchActions = generateActionSet(config.eventPrefix, 'fetch')
  const updateActions = generateActionSet(config.eventPrefix, 'update')
  const deleteActions = generateActionSet(config.eventPrefix, 'delete')

  const defaultState = Immutable.fromJS({

    // raw: Contains raw data objects
    // {
    //   123: { ... },
    //   234: { ... }
    // }
    raw: {}
  })

  // Clerk reducer
  return (state = {}, action) => {

    // Extend existing state
    // This comes into play when clerk is used to extend an existing reducer
    state = state.merge(defaultState)

    switch(action) {
      case createActions.success:
        return createReducer.success(state)
      case fetchActions.success:
        return fetchReducer.success(state)
      case updateActions.success:
        return updateReducer.success(state)
      case deleteActions.success:
        return deleteReducer.success(state)
      default:
        return state
    }
  }
}

export default reducer
