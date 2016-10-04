export const start = (state, action) => {
  return state.deleteIn(['raw', action.uid.toString()])
}
