import Immutable from 'immutable'

const reducer = (config) => {

  if (!config.eventPrefix) throw new Error('clerk.reducer: Expected eventPrefix')
  if (!config.uid) throw new Error('clerk.reducer: Expected uid')

  const defaultState = Immutable.fromJS({
    raw: {}
  })

  return (state = defaultState, action) => {
    switch(action) {
      
    }
  }
}

export default reducer
