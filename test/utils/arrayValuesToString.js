import { expect } from 'chai'
import arrayValuesToString from '../../src/utils/arrayValuesToString'

describe('Utils::arrayValuesToString', () => {
  describe('arrayValuesToString', () => {
    it('should return false if provided value is not an array', () => {
      expect(arrayValuesToString('test')).to.be.false
      expect(arrayValuesToString(1)).to.be.false
      expect(arrayValuesToString({})).to.be.false
      expect(arrayValuesToString(true)).to.be.false
    })

    it('should return all array values as strings', () => {
      expect(arrayValuesToString([
        1, 2, 3, 4, 5, 6, 'test', '123'
      ])).to.deep.equal([
        '1', '2', '3', '4', '5', '6', 'test', '123'
      ])
    })
  })
})
