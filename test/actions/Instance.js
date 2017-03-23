import { expect } from 'chai'
import sinon from 'sinon'
import { Instance } from '../../src/actions/Instance'

describe('Actions::Instance', () => {

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
      const action = new Instance(config)
      const actionDo = action.do('users')
      expect(actionDo).to.be.a('function')
    })

    it('should dispatch start action with provided instance key', () => {
      const action = new Instance(config)
      action.do('users')(dispatchSpy)
      expect(dispatchSpy.calledThrice).to.be.true
      expect(dispatchSpy.firstCall.calledWith({
        type: 'TEST_INSTANCE_PRE',
        instance: 'users'
      })).to.be.true
      expect(dispatchSpy.secondCall.calledWith({
        type: 'TEST_INSTANCE',
        instance: 'users'
      })).to.be.true
      expect(dispatchSpy.thirdCall.calledWith({
        type: 'TEST_INSTANCE_POST',
        instance: 'users'
      })).to.be.true
    })
  })
})
