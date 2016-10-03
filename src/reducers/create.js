const success = (state, action) => {
  return state.setIn('raw', action.uid, action.data)
}

export default {
  success
}
