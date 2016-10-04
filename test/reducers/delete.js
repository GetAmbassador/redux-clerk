import { expect } from 'chai'
import Immutable from 'immutable'
import { start } from '../../src/reducers/delete'

describe('Reducers::Delete', () => {
  describe('start', () => {
    it('should remove provided uid from state', () => {
      const previousState = Immutable.fromJS({
        raw: {
          123: { uid: 123, test: '123' },
          234: { uid: 234, test: '234' }
        }
      })

      const action = {
        uid: 234
      }

      const expectedResult = {
        raw: {
          123: { uid: 123, test: '123' }
        }
      }

      expect(start(previousState, action).toJS()).to.deep.equal(expectedResult)
    })
  })
})
