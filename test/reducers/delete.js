import { expect } from 'chai'
import Immutable, { Map } from 'immutable'
import { start, success, error } from '../../src/reducers/delete'

describe('Reducers::Delete', () => {
  describe('start', () => {
    it('should move provided uid from raw to pendingDelete', () => {
      const previousState = Immutable.fromJS({
        raw: Map([[123, Immutable.fromJS({ uid: 123, test: '123' })], [234, Immutable.fromJS({ uid: 234, test: '234' })]]),
        instances: {
          test1: {
            data: [123,234]
          }
        },
        pendingDelete: Map({})
      })

      const action = {
        uid: 234,
        instance: 'test1'
      }

      const expectedResult = {
        raw: {
          123: { uid: 123, test: '123' }
        },
        instances: {
          test1: {
            data: [123]
          }
        },
        pendingDelete: {
          234: { index: 1, data: { uid: 234, test: '234' }}
        }
      }

      expect(start(previousState, action).toJS()).to.deep.equal(expectedResult)
    })
  })

  describe('success', () => {
    it('should remove the provided item from pendingDelete', () => {
      const previousState = Map({
        raw: Map([[123, Immutable.fromJS({ uid: 123, test: '123' })]]),
        pendingDelete: Map([[234, Immutable.fromJS({ index: 0, data: { uid: 234, test: '234' }})]])
      })

      const action = {
        uid: 234
      }

      const expectedResult = {
        raw: {
          123: { uid: 123, test: '123' }
        },
        pendingDelete: {}
      }

      expect(success(previousState, action).toJS()).to.deep.equal(expectedResult)
    })
  })

  describe('error', () => {
    it('should re-add the deleted item', () => {
      const previousState = Immutable.fromJS({
        raw: Map([[123, Immutable.fromJS({ uid: 123, test: '123' })]]),
        instances: {
          test1: {
            data: [123]
          }
        },
        pendingDelete: Map([[234, Immutable.fromJS({ index: 1, data: { uid: 234, test: '234' }})]])
      })

      const action = {
        uid: 234,
        instance: 'test1'
      }

      const expectedResult = {
        raw: {
          123: { uid: 123, test: '123' },
          234: { uid: 234, test: '234' }
        },
        instances: {
          test1: {
            data: [123,234]
          }
        },
        pendingDelete: {}
      }

      expect(error(previousState, action).toJS()).to.deep.equal(expectedResult)
    })
  })
})
