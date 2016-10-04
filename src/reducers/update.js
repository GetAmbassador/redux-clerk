/**
 * The start action for the update reducer
 * @param  {Immutable.Map} state - reducer configuration
 * @param  {Object} action - action object
 *
 * @return {Immutable.Map} - updated state
 */
export const start = (state, action) => {
  return state.setIn(['raw', action.data.get(action.uidField)], action.data)
}

export default {
  start
}
