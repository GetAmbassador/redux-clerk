import { expect } from 'chai'
import { fromJS, List } from 'immutable'
import { mergeDeepOverwriteLists } from '../../src/utils/mergeDeepOverwriteLists'

describe('Utils::MergeDeepOverwriteLists', () => {
  describe('mergeDeepOverwriteLists', () => {
    it('should replace a with b if b is null', () => {
      expect(mergeDeepOverwriteLists('test', null)).to.be.null
    })
  
    it('should merge a with b when a is mergeable and not an Immutable List', () => {
      const a = fromJS({
        prop1: 'test a',
        prop2: {
          childProp1: 'child test a'
        },
        prop3: [123, 234],
        prop4: null
      })
  
      const b = fromJS({
        prop1: 'test b',
        prop2: {
          childProp1: null
        },
        prop3: [234],
        prop4: 'b not null'
      })

      const expectedResult = fromJS({
        prop1: 'test b',
        prop2: {
          childProp1: null
        },
        prop3: [234],
        prop4: 'b not null'
      })
  
      expect(mergeDeepOverwriteLists(a, b)).to.deep.equal(expectedResult)
    })
  
    it('should replace a with b if a is an Immutable List', () => {
      expect(mergeDeepOverwriteLists(List([123, 234]), List([234]))).to.deep.equal(List([234]))
    })
  })
})
