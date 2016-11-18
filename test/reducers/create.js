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
    it('should replace the temporary uid with the permanent uid', () => {
      const previousState = Immutable.fromJS({
        raw: Map([['temp123', Immutable.fromJS({ uid: 'temp123', test: '123' })], [234, Immutable.fromJS({ uid: 234, test: '234' })]]),
        instances: {
          test1: {
            data: ['temp123', 234]
          }
        }
      })

      const action = {
        record: Immutable.fromJS({ uid: 'temp123', test: '123' }),
        responseData: { uid: 123, test: '123' },
        instance: 'test1',
        uidField: 'uid'
      }

      const expectedResult = {
        raw: {
          123: { uid: 123, test: '123' },
          234: { uid: 234, test: '234' }
        },
        instances: {
          test1: {
            data: [123, 234]
          }
        }
      }

      expect(success(previousState, action).toJS()).to.deep.equal(expectedResult)
    })
  })

  describe('error', () => {
    it('should remove the created item', () => {
      const previousState = Immutable.fromJS({
        raw: Map([['temp123', Immutable.fromJS({ uid: 'temp123', test: '123' })], [234, Immutable.fromJS({ uid: 234, test: '234' })]]),
        instances: {
          test1: {
            data: ['temp123', 234]
          }
        }
      })

      const action = {
        record: Immutable.fromJS({ uid: 'temp123', test: '123' }),
        instance: 'test1',
        uidField: 'uid'
      }

      const expectedResult = {
        raw: {
          234: { uid: 234, test: '234' }
        },
        instances: {
          test1: {
            data: [234]
          }
        }
      }

      expect(error(previousState, action).toJS()).to.deep.equal(expectedResult)
    })
  })
})
