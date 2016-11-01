import { expect } from 'chai'
import Immutable, { Map } from 'immutable'
import { start, success, error } from '../../src/reducers/update'

describe('Reducers::Update', () => {
  describe('start', () => {
    it('should update data in state', () => {
      const previousState = Map({
        raw: Map([[123, Immutable.fromJS({ uid: 123, test: '123' })]])
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

  describe('success', () => {
    it('should return existing state', () => {
      const previousState = Map({
        raw: Map([[123, Immutable.fromJS({ uid: 123, test: '123' })], [234, Immutable.fromJS({ uid: 234, test: '234' })]])
      })

      const expectedResult = {
        raw: {
          123: { uid: 123, test: '123' },
          234: { uid: 234, test: '234' }
        }
      }

      expect(success(previousState).toJS()).to.deep.equal(expectedResult)
    })
  })

  describe('error', () => {
    it('should revert the update', () => {
      const previousState = Map({
        raw: Map([[123, Immutable.fromJS({ uid: 123, test: 'name' })], [234, Immutable.fromJS({ uid: 234, test: '234' })]])
      })

      const action = {
        updated: Immutable.fromJS({ uid: 123, test: '123' }),
        uidField: 'uid'
      }

      const expectedResult = {
        raw: {
          123: { uid: 123, test: '123' },
          234: { uid: 234, test: '234' }
        }
      }

      expect(error(previousState, action).toJS()).to.deep.equal(expectedResult)
    })
  })
})
