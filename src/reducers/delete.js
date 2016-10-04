const success = (state, action) => {
  return state.deleteIn(['raw', action.uid])
}

export default {
  success
}
