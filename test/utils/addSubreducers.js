import addSubreducers from '../../src/utils/addSubreducers'
import { expect } from 'chai'
import Immutable from 'immutable'

describe('Helpers::AddSubreducers', () => {
  const defaultPrimaryReducerState = Immutable.fromJS({
    data: []
  })

  const defaultSecondaryReducerState = Immutable.fromJS({
    data: []
  })

  const primaryReducer = (state = defaultPrimaryReducerState, action) => {
    if (action.data) {
      return state.withMutations(map => {
        map.set('data', action.data)
      })
    }
    else {
      return state
    }
  }

  const secondaryReducer = (state = defaultSecondaryReducerState, action) => {
    if (action.secondaryData) {
      return state.withMutations(map => {
        map.set('data', action.secondaryData)
      })
    }
    else {
      return state
    }
  }

  it('should return the primary reducer object extended with the secondary reducer object', () => {
    const extendedReducer = addSubreducers(primaryReducer, { secondaryReducer })

    let newState = extendedReducer(undefined, {data: ['primary']})

    expect(newState.get('data')).to.have.length(1)
    expect(newState.get('data')[0]).to.equal('primary')
    expect(newState.get('secondaryReducer').get('data').toJS()).to.have.length(0)

    newState = extendedReducer(newState, {data: ['primary', 'primary_new'], secondaryData: ['secondary']})

    expect(newState.get('data')).to.have.length(2)
    expect(newState.get('data')[0]).to.equal('primary')
    expect(newState.get('data')[1]).to.equal('primary_new')
    expect(newState.get('secondaryReducer').get('data').toJS()).to.have.length(1)
    expect(newState.get('secondaryReducer').get('data')[0]).to.equal('secondary')
  })
})
