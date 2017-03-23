import { expect } from 'chai'
import generateActionNames from '../../src/utils/actionNames'

describe('Utils::ActionNames', () => {
  describe('generateActionNames', () => {
    it('should return generated action names', () => {
      const expectedResult = {
        startPre: 'USERS_FETCH_PRE',
        start: 'USERS_FETCH',
        startPost: 'USERS_FETCH_POST',
        successPre: 'USERS_FETCH_SUCCESS_PRE',
        success: 'USERS_FETCH_SUCCESS',
        successPost: 'USERS_FETCH_SUCCESS_POST',
        errorPre: 'USERS_FETCH_ERROR_PRE',
        error: 'USERS_FETCH_ERROR',
        errorPost: 'USERS_FETCH_ERROR_POST'
      }

      expect(generateActionNames('users', 'fetch')).to.deep.equal(expectedResult)
    })
  })
})
