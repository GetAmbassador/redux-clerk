import { expect } from 'chai'
import Immutable, { Map } from 'immutable'
import { datasetSelector, datasetOptimisticSelector, datasetPropertySelector } from '../../src/selectors/dataset'

describe('Selectors', () => {
  describe('dataset', () => {
    it('should return computed derived data based on provided state', () => {

      const currentState = {
        companies: Immutable.fromJS({
          raw:  Map([
            ['123', Immutable.fromJS({ uid: 123, name: 'test 123' })],
            ['234', Immutable.fromJS({ uid: 234, name: 'test 234' })],
            ['345', Immutable.fromJS({ uid: 345, name: 'test 345' })]
          ]),
          pendingRaw: Map([
            ['234', Immutable.fromJS({ uid: 234, name: 'test 234 updated' })]
          ]),
          pending: {
            create: ['123'],
            update: ['234'],
            remove: ['345']
          },
          instances: {
            test1: {
              data: ['234','123','345']
            }
          }
        })
      }

      const config = {
        baseSelector: state => state.companies
      }

      const expectedResult = {
        data: [
          { uid: 234, name: 'test 234', pendingUpdate: true },
          { uid: 345, name: 'test 345', pendingRemove: true }
        ]
      }

      expect(datasetSelector(config, currentState, 'test1').toJS()).to.deep.equal(expectedResult)
    })

    it('should return empty map if instance has not yet been created', () => {

      const currentState = {
        companies: Immutable.fromJS({
          raw: Map({}),
          instances: {}
        })
      }

      const config = {
        baseSelector: state => state.companies
      }

      const expectedResult = {}

      expect(datasetSelector(config, currentState, 'test1').toJS()).to.deep.equal(expectedResult)
    })

    it('should return additional data if provided', () => {

      const currentState = {
        companies: Immutable.fromJS({
          raw:  Map([
            ['123', Immutable.fromJS({ uid: 123, name: 'test 123' })],
            ['234', Immutable.fromJS({ uid: 234, name: 'test 234' })],
            ['345', Immutable.fromJS({ uid: 345, name: 'test 345' })]
          ]),
          pending: {
            create: [],
            update: [],
            remove: []
          },
          instances: {
            test1: {
              data: ['234','123','345'],
              additionalData: {
                totalCount: 3
              }
            }
          }
        })
      }

      const config = {
        baseSelector: state => state.companies
      }

      const expectedResult = {
        data: [
          { uid: 234, name: 'test 234' },
          { uid: 123, name: 'test 123' },
          { uid: 345, name: 'test 345' }
        ],
        totalCount: 3
      }

      expect(datasetSelector(config, currentState, 'test1').toJS()).to.deep.equal(expectedResult)
    })
  })

  describe('datasetOptimistic', () => {
    it('should return computed derived data based on provided state', () => {

      const currentState = {
        companies: Immutable.fromJS({
          raw:  Map([
            ['123', Immutable.fromJS({ uid: 123, name: 'test 123' })],
            ['234', Immutable.fromJS({ uid: 234, name: 'test 234' })],
            ['345', Immutable.fromJS({ uid: 345, name: 'test 345' })]
          ]),
          pendingRaw: Map([
            ['234', Immutable.fromJS({ uid: 234, name: 'test 234 updated' })]
          ]),
          pending: {
            create: ['123'],
            update: ['234'],
            remove: ['345']
          },
          instances: {
            test1: {
              data: ['234','123','345']
            }
          }
        })
      }

      const config = {
        baseSelector: state => state.companies
      }

      const expectedResult = {
        data: [
          { uid: 234, name: 'test 234 updated', pendingUpdate: true },
          { uid: 123, name: 'test 123', pendingCreate: true }
        ]
      }

      expect(datasetOptimisticSelector(config, currentState, 'test1').toJS()).to.deep.equal(expectedResult)
    })

    it('should return empty map if instance has not yet been created', () => {

      const currentState = {
        companies: Immutable.fromJS({
          raw: Map({}),
          instances: {}
        })
      }

      const config = {
        baseSelector: state => state.companies
      }

      const expectedResult = {}

      expect(datasetOptimisticSelector(config, currentState, 'test1').toJS()).to.deep.equal(expectedResult)
    })

    it('should return additional data if provided', () => {

      const currentState = {
        companies: Immutable.fromJS({
          raw:  Map([
            ['123', Immutable.fromJS({ uid: 123, name: 'test 123' })],
            ['234', Immutable.fromJS({ uid: 234, name: 'test 234' })],
            ['345', Immutable.fromJS({ uid: 345, name: 'test 345' })]
          ]),
          pending: {
            create: [],
            update: [],
            remove: []
          },
          instances: {
            test1: {
              data: ['234','123','345'],
              additionalData: {
                totalCount: 3
              }
            }
          }
        })
      }

      const config = {
        baseSelector: state => state.companies
      }

      const expectedResult = {
        data: [
          { uid: 234, name: 'test 234' },
          { uid: 123, name: 'test 123' },
          { uid: 345, name: 'test 345' }
        ],
        totalCount: 3
      }

      expect(datasetOptimisticSelector(config, currentState, 'test1').toJS()).to.deep.equal(expectedResult)
    })
  })

  describe('datasetProperty', () => {
    it('should return a data property from the state', () => {

      const currentState = {
        companies: Immutable.fromJS({
          raw:  Map([
            ['123', Immutable.fromJS({ uid: 123, name: 'test 123' })],
            ['234', Immutable.fromJS({ uid: 234, name: 'test 234' })],
            ['345', Immutable.fromJS({ uid: 345, name: 'test 345' })]
          ]),
          instances: {
            test1: {
              additionalData: {
                totalCount: 42
              },
              data: ['234','123','345']
            }
          }
        })
      }

      const config = {
        baseSelector: state => state.companies
      }

      expect(datasetPropertySelector(config, currentState, 'test1', 'totalCount')).to.equal(42)
    })
  })
})
