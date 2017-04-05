import { expect } from 'chai'
import Immutable, { Map } from 'immutable'
import { recordSelector, recordOptimisticSelector, recordStateSelector } from '../../src/selectors/record'

describe('Selectors', () => {
  describe('record', () => {
    it('should return a single record', () => {

      const currentState = {
        companies: Immutable.fromJS({
          raw:  Map([
            [123, Immutable.fromJS({ uid: 123, name: 'test 123' })],
            [234, Immutable.fromJS({ uid: 234, name: 'test 234' })],
            [345, Immutable.fromJS({ uid: 345, name: 'test 345' })]
          ]),
          instances: {
            test1: {
              data: [234,123,345]
            }
          }
        })
      }

      const config = {
        baseSelector: state => state.companies
      }

      const expectedResult = { uid: 234, name: 'test 234' }

      expect(recordSelector(config, currentState, 234).toJS()).to.deep.equal(expectedResult)
    })

    it('should return a single record when uid is passed as string', () => {

      const currentState = {
        companies: Immutable.fromJS({
          raw:  Map([
            [123, Immutable.fromJS({ uid: 123, name: 'test 123' })],
            [234, Immutable.fromJS({ uid: 234, name: 'test 234' })],
            [345, Immutable.fromJS({ uid: 345, name: 'test 345' })]
          ]),
          instances: {
            test1: {
              data: [234,123,345]
            }
          }
        })
      }

      const config = {
        baseSelector: state => state.companies
      }

      const expectedResult = { uid: 234, name: 'test 234' }

      expect(recordSelector(config, currentState, '234').toJS()).to.deep.equal(expectedResult)
    })

    it('should return undefined if record is not found', () => {

      const currentState = {
        companies: Immutable.fromJS({
          raw:  Map([
            [123, Immutable.fromJS({ uid: 123, name: 'test 123' })],
            [234, Immutable.fromJS({ uid: 234, name: 'test 234' })],
            [345, Immutable.fromJS({ uid: 345, name: 'test 345' })]
          ]),
          instances: {
            test1: {
              data: [234,123,345]
            }
          }
        })
      }

      const config = {
        baseSelector: state => state.companies
      }

      expect(recordSelector(config, currentState, 1234)).to.be.an('undefined')
    })
  })

  describe('recordOptimistic', () => {
    it('should return a single record', () => {

      const currentState = {
        companies: Immutable.fromJS({
          raw:  Map([
            [123, Immutable.fromJS({ uid: 123, name: 'test 123' })],
            [234, Immutable.fromJS({ uid: 234, name: 'test 234' })],
            [345, Immutable.fromJS({ uid: 345, name: 'test 345' })]
          ]),
          pendingRaw: Map([
            [234, Immutable.fromJS({ uid: 234, name: 'test 234 updated' })]
          ]),
          pending: {
            update: [234]
          },
          instances: {
            test1: {
              data: [234,123,345]
            }
          }
        })
      }

      const config = {
        baseSelector: state => state.companies
      }

      const expectedResult = { uid: 234, name: 'test 234 updated' }

      expect(recordOptimisticSelector(config, currentState, 234).toJS()).to.deep.equal(expectedResult)
    })

    it('should return a single record when uid is passed as string', () => {

      const currentState = {
        companies: Immutable.fromJS({
          raw:  Map([
            [123, Immutable.fromJS({ uid: 123, name: 'test 123' })],
            [234, Immutable.fromJS({ uid: 234, name: 'test 234' })],
            [345, Immutable.fromJS({ uid: 345, name: 'test 345' })]
          ]),
          pendingRaw: Map([
            [234, Immutable.fromJS({ uid: 234, name: 'test 234 updated' })]
          ]),
          pending: {
            update: [234]
          },
          instances: {
            test1: {
              data: [234,123,345]
            }
          }
        })
      }

      const config = {
        baseSelector: state => state.companies
      }

      const expectedResult = { uid: 234, name: 'test 234 updated' }

      expect(recordOptimisticSelector(config, currentState, '234').toJS()).to.deep.equal(expectedResult)
    })

    it('should return undefined if record is not found', () => {

      const currentState = {
        companies: Immutable.fromJS({
          raw:  Map([
            [123, Immutable.fromJS({ uid: 123, name: 'test 123' })],
            [234, Immutable.fromJS({ uid: 234, name: 'test 234' })],
            [345, Immutable.fromJS({ uid: 345, name: 'test 345' })]
          ]),
          pendingRaw: Map([
            [234, Immutable.fromJS({ uid: 234, name: 'test 234 updated' })]
          ]),
          pending: {
            update: [234]
          },
          instances: {
            test1: {
              data: [234,123,345]
            }
          }
        })
      }

      const config = {
        baseSelector: state => state.companies
      }

      expect(recordOptimisticSelector(config, currentState, 1234)).to.be.an('undefined')
    })
  })

  describe('recordState', () => {
    it('should return a single record\'s pending states', () => {

      const currentState = {
        companies: Immutable.fromJS({
          raw:  Map([
            [123, Immutable.fromJS({ uid: 123, name: 'test 123' })],
            [234, Immutable.fromJS({ uid: 234, name: 'test 234' })],
            [345, Immutable.fromJS({ uid: 345, name: 'test 345' })],
            [456, Immutable.fromJS({ uid: 456, name: 'test 456' })]
          ]),
          pendingRaw: Map([
            [234, Immutable.fromJS({ uid: 234, name: 'test 234 updated' })]
          ]),
          pending: {
            create: [123],
            update: [234],
            remove: [345]
          },
          instances: {
            test1: {
              data: [234,123,345,456]
            }
          }
        })
      }

      const config = {
        baseSelector: state => state.companies
      }

      let expectedResult = {
        pendingCreate: true,
        pendingUpdate: false,
        pendingRemove: false
      }

      expect(recordStateSelector(config, currentState, 123).toJS()).to.deep.equal(expectedResult)

      expectedResult = {
        pendingCreate: false,
        pendingUpdate: true,
        pendingRemove: false
      }

      expect(recordStateSelector(config, currentState, 234).toJS()).to.deep.equal(expectedResult)

      expectedResult = {
        pendingCreate: false,
        pendingUpdate: false,
        pendingRemove: true
      }

      expect(recordStateSelector(config, currentState, 345).toJS()).to.deep.equal(expectedResult)

      expectedResult = {
        pendingCreate: false,
        pendingUpdate: false,
        pendingRemove: false
      }

      expect(recordStateSelector(config, currentState, 456).toJS()).to.deep.equal(expectedResult)
    })
  })
})
