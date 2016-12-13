import { expect } from 'chai'
import { isObject } from '../../src/utils/is'

describe('Utils::Is', () => {
  describe('isObject', () => {
    it('should return true if provided value is an object', () => {
      expect(isObject({})).to.be.true
    })

    it('should return false if provided value is not an object', () => {
      expect(isObject(null)).to.be.false
      expect(isObject(undefined)).to.be.false
      expect(isObject(true)).to.be.false
      expect(isObject([])).to.be.false
      expect(isObject(1)).to.be.false
      expect(isObject('test')).to.be.false
    })
  })
})
