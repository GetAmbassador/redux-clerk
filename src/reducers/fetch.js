import normalize from '../utils/normalize'

export const success = (state, action) => {

  // If the returned data is a list we normalize and add each item
  if(action.data && action.data.size) {
    const normalizedData = normalize(action.uidField, action.data)
    return state.set('raw', state.get('raw').merge(normalizedData))
  }

  // Otherwise we update the single object
  return state.setIn(['raw', action.uid, action.data])
}
