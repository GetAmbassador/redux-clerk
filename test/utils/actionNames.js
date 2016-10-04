import { expect } from 'chai'
import { generateActionNames } from '../../src/utils/actionNames'

console.log(generateActionNames);

describe('generateActionNames', () => {
  it('should return generated action names', () => {
    const expectedResult = {
      start: 'USERS_FETCH',
      success: 'USERS_FETCH_SUCCESS',
      error: 'USERS_FETCH_ERROR',
    }

    expect(generateActionNames('users', 'fetch')).to.deep.equal(expectedResult)
  })
})
