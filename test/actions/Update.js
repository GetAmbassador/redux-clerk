import { expect } from 'chai'
import sinon from 'sinon'
import { Update } from '../../src/actions/Update'

describe('Actions::Update', () => {

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
      const action = new Update(config)
      const actionDo = action.do({ other: 'data' })
      expect(actionDo).to.be.a('function')
    })

    it('should dispatch success action', () => {
      const action = new Update(config)
      action.do({ other: 'data' })(dispatchSpy)
      expect(dispatchSpy.calledOnce).to.be.true
      expect(dispatchSpy.calledWith({ type: 'TEST_UPDATE_SUCCESS', other: 'data' })).to.be.true
    })
  })
})
