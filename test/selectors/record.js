import { expect } from 'chai'
import Immutable, { Map } from 'immutable'
import { recordSelector } from '../../src/selectors/record'

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
})
