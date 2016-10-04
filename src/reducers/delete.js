const start = (state, action) => {
  return state.deleteIn(['raw', action.data.get(action.uidField)])
}

export default {
  start
}
