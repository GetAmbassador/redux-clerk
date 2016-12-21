import { expect } from 'chai'
import sinon from 'sinon'
import { Map } from 'immutable'
import { Fetch } from '../../src/actions/Fetch'

describe('Actions::Fetch', () => {

  let dispatchSpy

  const configBase = {
    actionPrefix: 'test',
    uidField: 'uid'
  }

  const configSuccess = Object.assign({}, configBase, {
    fetcher: (params, success) => {
      success([{ uid: 123, name: 'test' }])
      return Promise.resolve()
    }
  })

  const configError = Object.assign({}, configBase, {
    fetcher: (params, success, error) => {
      error({ error: 'test' })
      return Promise.resolve()
    }
  })

  const configSpy = Object.assign({}, configBase, {
    fetcher: sinon.spy()
  })

  beforeEach(() => {
    dispatchSpy = sinon.spy()
  })

  describe('do', () => {
    it('should return a thunk', () => {
      const action = new Fetch(configBase)
      const actionDo = action.do('users')
      expect(actionDo).to.be.a('function')
    })

    it('should dispatch start action', () => {
      const action = new Fetch(configBase)
      action.do('users', Map({ page: 1 }), { appendResponse: true })(dispatchSpy)
      expect(dispatchSpy.calledOnce).to.be.true
      expect(dispatchSpy.calledWith({
        type: 'TEST_FETCH',
        instance: 'users',
        uidField: configBase.uidField,
        options: { appendResponse: true }
      })).to.be.true
    })

    it('should call config.fetcher with provided params', () => {
      const action = new Fetch(configSpy)
      const params = Map({ someParam: 'test' })
      action.do('users', params)(dispatchSpy)
      expect(configSpy.fetcher.calledOnce).to.be.true
      expect(configSpy.fetcher.args[0][0]).to.deep.equal(params)
    })

    it('should convert params to immutable', () => {
      const action = new Fetch(configSpy)
      const params = Map({ someParam: 'test' })
      action.do('users', params)(dispatchSpy)
      expect(configSpy.fetcher.args[0][0]).to.deep.equal(Map(params))
    })

    it('should dispatch success action', done => {
      const action = new Fetch(configSuccess)
      action.do('users')(dispatchSpy).then(() => {
        expect(dispatchSpy.calledTwice).to.be.true
        expect(dispatchSpy.secondCall.calledWith({
          type: 'TEST_FETCH_SUCCESS',
          instance: 'users',
          uidField: configBase.uidField,
          responseData: [{ uid: 123, name: 'test' }],
          options: {}
        })).to.be.true
        done()
      })
    })

    it('should dispatch error action', done => {
      const action = new Fetch(configError)
      action.do('users')(dispatchSpy).then(() => {
        expect(dispatchSpy.calledTwice).to.be.true
        expect(dispatchSpy.secondCall.calledWith({
          type: 'TEST_FETCH_ERROR',
          instance: 'users',
          uidField: configBase.uidField,
          responseData: { error: 'test' },
          options: {}
        })).to.be.true
        done()
      })
    })
  })
})
