/**
 * The start action for the delete reducer
 * @param  {Immutable.Map} state - reducer configuration
 * @param  {Object} action - action object
 *
 * @return {Immutable.Map} - updated state
 */
export const start = (state, action) => {
  return state.deleteIn(['raw', action.uid.toString()])
}

export default {
  start
}
