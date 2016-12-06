import { expect } from 'chai'
import Immutable, { Map } from 'immutable'
import { start, success, error } from '../../src/reducers/fetch'

describe('Reducers::Fetch', () => {

  describe('start', () => {
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

      expect(start(previousState, {}).toJS()).to.deep.equal(expectedResult)
    })
  })

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
        instance: 'test1',
        responseData: [
          { uid: 123, test: 'name' },
          { uid: 345, test: '345' }
        ],
        options: {}
      }

      const expectedResult = {
        raw: {
          123: { uid: 123, test: 'name' },
          234: { uid: 234, test: '234' },
          345: { uid: 345, test: '345' }
        },
        instances: {
          test1: {
            data: [123, 345]
          }
        }
      }

      expect(success(previousState, action).toJS()).to.deep.equal(expectedResult)
    })

    it('should append the response data if options.appendResponse is true', () => {
      const previousState = Immutable.fromJS({
        raw: {
          123: { uid: 123, test: '123' },
          234: { uid: 234, test: '234' }
        },
        instances: {
          test1: {
            data: [123, 234]
          }
        }
      })

      const action = {
        uidField: 'uid',
        instance: 'test1',
        responseData: [
          { uid: 456, test: '456' },
          { uid: 345, test: '345' }
        ],
        options: {
          appendResponse: true
        }
      }

      const expectedResult = {
        raw: {
          123: { uid: 123, test: '123' },
          234: { uid: 234, test: '234' },
          345: { uid: 345, test: '345' },
          456: { uid: 456, test: '456' }
        },
        instances: {
          test1: {
            data: [123, 234, 456, 345]
          }
        }
      }

      expect(success(previousState, action).toJS()).to.deep.equal(expectedResult)
    })
  })

  describe('error', () => {
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

      expect(error(previousState, {}).toJS()).to.deep.equal(expectedResult)
    })
  })
})
