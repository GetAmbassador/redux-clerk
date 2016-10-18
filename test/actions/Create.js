import { expect } from 'chai'
import sinon from 'sinon'
import { Create } from '../../src/actions/Create'

describe('Actions::Create', () => {

  let dispatchSpy

  const configBase = {
    actionPrefix: 'test',
    uidField: 'uid'
  }

  const configSuccess = Object.assign({}, configBase, {
    creator: (data, success) => {
      success({ uid: 123, name: 'test' })
      return Promise.resolve()
    }
  })

  const configError = Object.assign({}, configBase, {
    creator: (data, success, error) => {
      error({ error: 'test' })
      return Promise.resolve()
    }
  })

  beforeEach(() => {
    dispatchSpy = sinon.spy()
  })

  describe('do', () => {
    it('should return a thunk', () => {
      const action = new Create(configBase)
      const actionDo = action.do({ uid: 'new', name: 'test' })
      expect(actionDo).to.be.a('function')
    })

    it('should dispatch start action', () => {
      const action = new Create(configBase)
      action.do({ other: 'data' })(dispatchSpy)
      expect(dispatchSpy.calledOnce).to.be.true
      expect(dispatchSpy.calledWith({ type: 'TEST_CREATE', data: { other: 'data' }})).to.be.true
    })

    it('should dispatch success action', done => {
      const action = new Create(configSuccess)
      action.do({ uid: 'new', name: 'test' })(dispatchSpy).then(() => {
        expect(dispatchSpy.calledTwice).to.be.true
        expect(dispatchSpy.secondCall.calledWith({ type: 'TEST_CREATE_SUCCESS', data: { uid: 123, name: 'test' }})).to.be.true
        done()
      })
    })

    it('should dispatch error action', done => {
      const action = new Create(configError)
      action.do({ uid: 'new', name: 'test' })(dispatchSpy).then(() => {
        expect(dispatchSpy.calledTwice).to.be.true
        expect(dispatchSpy.secondCall.calledWith({ type: 'TEST_CREATE_ERROR', data: { error: 'test' }})).to.be.true
        done()
      })
    })
  })
})
