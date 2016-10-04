import { expect } from 'chai'
import Immutable from 'immutable'
import { start } from '../../src/reducers/create'

describe('Reducers::Create', () => {
  describe('start', () => {
    it('should update data in state', () => {
      const previousState = Immutable.fromJS({
        raw: {
          123: { uid: 123, test: '123' }
        }
      })

      const action = {
        data: Immutable.fromJS({ uid: 234, test: '234' }),
        uidField: 'uid'
      }

      const expectedResult = {
        raw: {
          123: { uid: 123, test: '123' },
          234: { uid: 234, test: '234' }
        }
      }

      expect(start(previousState, action).toJS()).to.deep.equal(expectedResult)
    })
  })
})
