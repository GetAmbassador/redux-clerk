import { expect } from 'chai'
import sinon from 'sinon'
import { Create } from '../../src/actions/Create'

describe('Actions::Create', () => {

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
      const action = new Create(config)
      const actionDo = action.do({ other: 'data' })
      expect(actionDo).to.be.a('function')
    })

    it('should dispatch success action', () => {
      const action = new Create(config)
      action.do({ other: 'data' })(dispatchSpy)
      expect(dispatchSpy.calledOnce).to.be.true
      expect(dispatchSpy.calledWith({ type: 'TEST_CREATE_SUCCESS', other: 'data' })).to.be.true
    })
  })
})
