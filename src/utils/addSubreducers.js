/**
 * Combine reducers by adding secondary reducers to the primary
 * @param  {Function} primary - primary reducer
 * @param  {Array} secondary - Array of secondary reducers
 *
 * @return {Object} - Updated state
 */

export const addSubreducers = (primary, secondary) => {
  return (state, action) => {
    let nextState = primary(state, action)

    for (let reducer in secondary) {
      if (secondary.hasOwnProperty(reducer)) {
        const previousStateForReducer = state ? state.get(reducer) : undefined
        const nextStateForReducer = secondary[reducer](previousStateForReducer, action)

        nextState = nextState.set(reducer, nextStateForReducer)
      }
    }

    return nextState
  }
}
