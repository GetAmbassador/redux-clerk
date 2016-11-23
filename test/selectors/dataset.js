import { expect } from 'chai'
import Immutable, { Map } from 'immutable'
import { datasetSelector } from '../../src/selectors/dataset'

describe('Selectors', () => {
  describe('dataset', () => {
    it('should return computed derived data based on provided state', () => {

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

      const expectedResult = [
        { uid: 234, name: 'test 234' },
        { uid: 123, name: 'test 123' },
        { uid: 345, name: 'test 345' }
      ]

      expect(datasetSelector(config, currentState, 'test1').toJS()).to.deep.equal(expectedResult)
    })

    it('should return empty list if instance has not yet been created', () => {

      const currentState = {
        companies: Immutable.fromJS({
          raw: Map({}),
          instances: {}
        })
      }

      const config = {
        baseSelector: state => state.companies
      }

      const expectedResult = []

      expect(datasetSelector(config, currentState, 'test1').toJS()).to.deep.equal(expectedResult)
    })
  })
})
