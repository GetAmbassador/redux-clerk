import { expect } from 'chai'
import sinon from 'sinon'
import { Delete } from '../../src/actions/Delete'

describe('Actions::Delete', () => {

  let dispatchSpy

  const config = {
    actionPrefix: 'test',
    uidField: 'uid'
  }

  beforeEach(() => {
    dispatchSpy = sinon.spy()
  })

  describe('do', () => {
    it('should return a thunk', () => {
      const action = new Delete(config)
      const actionDo = action.do(123)
      expect(actionDo).to.be.a('function')
    })

    it('should dispatch success action', () => {
      const action = new Delete(config)
      action.do(123)(dispatchSpy)
      expect(dispatchSpy.calledOnce).to.be.true
      expect(dispatchSpy.calledWith({ type: 'TEST_DELETE_SUCCESS', uid: 123 })).to.be.true
    })
  })
})
