import normalize from '../utils/normalize'

const success = (state, action) => {

  // If the returned data is a list we normalize and add each item
  if(action.data && action.data instanceof Array) {
    const normalizedData = normalize(action.uidField, action.data)
    return state.merge('raw', normalizedData)
  }

  // Otherwise we update the single object
  return state.setIn(['raw', action.uid, action.data])
}

export default {
  success
}
