import { expect } from 'chai'
import Immutable from 'immutable'
import normalize from '../../src/utils/normalize'

describe('Utils::Normalize', () => {
  describe('normalize', () => {
    it('should return normalized map', () => {
      const data = Immutable.fromJS([
        { uid: 123, test: '123' },
        { uid: 234, test: '234' }
      ])

      const expectedOutput = {
        123: { uid: 123, test: '123' },
        234: { uid: 234, test: '234' }
      }

      expect(normalize('uid', data).toJS()).to.deep.equal(expectedOutput)
    })
  })
})
