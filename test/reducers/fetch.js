import { expect } from 'chai'
import Immutable from 'immutable'
import { success } from '../../src/reducers/fetch'

describe('Reducers::Fetch', () => {
  describe('success', () => {
    it('should normalize provided data if list and merge with raw state', () => {
      const previousState = Immutable.fromJS({
        raw: {
          123: { uid: 123, test: '123' },
          234: { uid: 234, test: '234' }
        }
      })

      const action = {
        uidField: 'uid',
        data: Immutable.fromJS([
          { uid: 123, test: 'name' },
          { uid: 345, test: '345' }
        ])
      }

      const expectedResult = {
        raw: {
          123: { uid: 123, test: 'name' },
          234: { uid: 234, test: '234' },
          345: { uid: 345, test: '345' }
        }
      }

      expect(success(previousState, action).toJS()).to.deep.equal(expectedResult)
    })
  })
})
