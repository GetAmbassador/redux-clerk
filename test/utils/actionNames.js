import { expect } from 'chai'
import generateActionNames from '../../src/utils/actionNames'

describe('Utils::ActionNames', () => {
  describe('generateActionNames', () => {
    it('should return generated action names', () => {
      const expectedResult = {
        start: 'USERS_FETCH',
        startPost: 'USERS_FETCH_POST',
        success: 'USERS_FETCH_SUCCESS',
        successPost: 'USERS_FETCH_SUCCESS_POST',
        error: 'USERS_FETCH_ERROR',
        errorPost: 'USERS_FETCH_ERROR_POST'
      }

      expect(generateActionNames('users', 'fetch')).to.deep.equal(expectedResult)
    })
  })
})
