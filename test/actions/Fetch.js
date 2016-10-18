import { expect } from 'chai'
import sinon from 'sinon'
import { Fetch } from '../../src/actions/Fetch'

describe('Actions::Fetch', () => {

  let dispatchSpy

  const configBase = {
    actionPrefix: 'test',
    uidField: 'uid'
  }

  const configSuccess = Object.assign({}, configBase, {
    fetcher: (data, success) => {
      success([{ uid: 123, name: 'test' }])
      return Promise.resolve()
    }
  })

  const configError = Object.assign({}, configBase, {
    fetcher: (data, success, error) => {
      error({ error: 'test' })
      return Promise.resolve()
    }
  })

  beforeEach(() => {
    dispatchSpy = sinon.spy()
  })

  describe('do', () => {
    it('should return a thunk', () => {
      const action = new Fetch(configBase)
      const actionDo = action.do()
      expect(actionDo).to.be.a('function')
    })

    it('should dispatch start action', () => {
      const action = new Fetch(configBase)
      action.do()(dispatchSpy)
      expect(dispatchSpy.calledOnce).to.be.true
      expect(dispatchSpy.calledWith({ type: 'TEST_FETCH' })).to.be.true
    })

    it('should dispatch success action', done => {
      const action = new Fetch(configSuccess)
      action.do()(dispatchSpy).then(() => {
        expect(dispatchSpy.calledTwice).to.be.true
        expect(dispatchSpy.secondCall.calledWith({ type: 'TEST_FETCH_SUCCESS', data: [{ uid: 123, name: 'test' }]})).to.be.true
        done()
      })
    })

    it('should dispatch error action', done => {
      const action = new Fetch(configError)
      action.do()(dispatchSpy).then(() => {
        expect(dispatchSpy.calledTwice).to.be.true
        expect(dispatchSpy.secondCall.calledWith({ type: 'TEST_FETCH_ERROR', data: { error: 'test' }})).to.be.true
        done()
      })
    })
  })
})
