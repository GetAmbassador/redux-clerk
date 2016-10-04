import { expect } from 'chai'
import Immutable from 'immutable'
import { start } from '../../src/reducers/update'

describe('Reducers::Update', () => {
  describe('start', () => {
    it('should update data in state', () => {
      const previousState = Immutable.fromJS({
        raw: {
          123: { uid: 123, test: '123' }
        }
      })

      const action = {
        data: Immutable.fromJS({ uid: 123, test: 'name' }),
        uidField: 'uid'
      }

      const expectedResult = {
        raw: {
          123: { uid: 123, test: 'name' }
        }
      }

      expect(start(previousState, action).toJS()).to.deep.equal(expectedResult)
    })
  })
})
