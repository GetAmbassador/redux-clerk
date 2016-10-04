export const start = (state, action) => {
  return state.setIn(['raw', action.data.get(action.uidField)], action.data)
}
