import { expect } from 'chai'
import Immutable, { Map } from 'immutable'
import { start, success, error } from '../../src/reducers/create'

describe('Reducers::Create', () => {
  describe('start', () => {
    it('should update data in state', () => {
      const previousState = Immutable.fromJS({
        raw: Map([[123, Immutable.fromJS({ uid: 123, test: '123' })]]),
        instances: {
          test1: { data: [123] }
        }
      })

      const action = {
        record: Immutable.fromJS({ uid: 234, test: '234' }),
        instance: 'test1',
        uidField: 'uid'
      }

      const expectedResult = {
        raw: {
          123: { uid: 123, test: '123' },
          234: { uid: 234, test: '234' }
        },
        instances: {
          test1: { data: [234, 123] }
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
    it('should remove the created item', () => {
      const previousState = Map({
        raw: Map([[123, Immutable.fromJS({ uid: 123, test: '123' })], [234, Immutable.fromJS({ uid: 234, test: '234' })]])
      })

      const action = {
        record: Immutable.fromJS({ uid: 234, test: '234' }),
        uidField: 'uid'
      }

      const expectedResult = {
        raw: {
          123: { uid: 123, test: '123' }
        }
      }

      expect(error(previousState, action).toJS()).to.deep.equal(expectedResult)
    })
  })
})
