import { expect } from 'chai'
import Immutable, { Map } from 'immutable'
import { start, success, error } from '../../src/reducers/fetch'

describe('Reducers::Fetch', () => {

  describe('start', () => {

    let previousState

    beforeEach(() => {
      previousState = Map({
        raw: Map([[123, Immutable.fromJS({ uid: 123, test: '123' })], [234, Immutable.fromJS({ uid: 234, test: '234' })]])
      })
    })

    it('should return existing state', () => {
      const expectedResult = {
        raw: {
          123: { uid: 123, test: '123' },
          234: { uid: 234, test: '234' }
        }
      }

      expect(start(previousState, {}).toJS()).to.deep.equal(expectedResult)
    })

    it('set additional data in state if provided', () => {

      const action = {
        instance: 'test1',
        additionalData: {
          totalCount: 2
        }
      }

      const expectedResult = {
        raw: {
          123: { uid: 123, test: '123' },
          234: { uid: 234, test: '234' }
        },
        instances: {
          test1: {
            additionalData: {
              totalCount: 2
            }
          }
        }
      }

      expect(start(previousState, action).toJS()).to.deep.equal(expectedResult)
    })
  })

  describe('success', () => {
    let previousState

    beforeEach(() => {
      previousState = Immutable.fromJS({
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
    })

    it('should normalize provided data if list and merge with raw state', () => {
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

    it('set additional data in state if provided', () => {
      const action = {
        uidField: 'uid',
        instance: 'test1',
        options: {},
        responseData: [
          { uid: 456, test: '456' },
          { uid: 345, test: '345' }
        ],
        additionalData: {
          totalCount: 2
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
            data: [456, 345],
            additionalData: {
              totalCount: 2
            }
          }
        }
      }

      expect(success(previousState, action).toJS()).to.deep.equal(expectedResult)
    })
  })

  describe('error', () => {
    let previousState

    previousState = Immutable.fromJS({
      raw: Map([[123, Immutable.fromJS({ uid: 123, test: '123' })], [234, Immutable.fromJS({ uid: 234, test: '234' })]]),
      instances: {
        test1: {
          data: [123, 234]
        }
      }
    })

    it('should return existing state', () => {
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

      expect(error(previousState, {}).toJS()).to.deep.equal(expectedResult)
    })

    it('set additional data in state if provided', () => {

      const action = {
        instance: 'test1',
        additionalData: {
          totalCount: 2
        }
      }

      const expectedResult = {
        raw: {
          123: { uid: 123, test: '123' },
          234: { uid: 234, test: '234' }
        },
        instances: {
          test1: {
            data: [123, 234],
            additionalData: {
              totalCount: 2
            }
          }
        }
      }

      expect(error(previousState, action).toJS()).to.deep.equal(expectedResult)
    })
  })
})
