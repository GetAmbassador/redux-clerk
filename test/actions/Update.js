import { expect } from 'chai'
import sinon from 'sinon'
import { Map } from 'immutable'
import { Update } from '../../src/actions/Update'

describe('Actions::Update', () => {

  let dispatchSpy

  const configBase = {
    actionPrefix: 'test',
    uidField: 'uid'
  }

  const configSuccess = Object.assign({}, configBase, {
    updater: (data, success) => {
      success({ uid: 123, name: 'test' })
      return Promise.resolve()
    }
  })

  const configError = Object.assign({}, configBase, {
    updater: (data, success, error) => {
      error({ error: 'test' })
      return Promise.resolve()
    }
  })

  const configSpy = Object.assign({}, configBase, {
    updater: sinon.spy()
  })

  beforeEach(() => {
    dispatchSpy = sinon.spy()
  })

  describe('do', () => {
    it('should return a thunk', () => {
      const action = new Update(configBase)
      const actionDo = action.do({ other: 'data' })
      expect(actionDo).to.be.a('function')
    })

    it('should dispatch start action', () => {
      const action = new Update(configBase)
      action.do(Map({ other: 'data' }))(dispatchSpy)
      expect(dispatchSpy.calledTwice).to.be.true
      expect(dispatchSpy.firstCall.calledWith({
        type: 'TEST_UPDATE',
        uidField: configBase.uidField,
        record: Map({ other: 'data' })
      })).to.be.true
      expect(dispatchSpy.secondCall.calledWith({
        type: 'TEST_UPDATE_POST',
        uidField: configBase.uidField,
        record: Map({ other: 'data' })
      })).to.be.true
    })

    it('should dispatch success action', done => {
      const action = new Update(configSuccess)
      action.do(Map({ uid: 123, name: 'test' }))(dispatchSpy).then(() => {
        expect(dispatchSpy.callCount).to.equal(4)
        expect(dispatchSpy.getCall(2).calledWith({
          type: 'TEST_UPDATE_SUCCESS',
          uidField: configBase.uidField,
          record: Map({ uid: 123, name: 'test' }),
          responseData: { uid: 123, name: 'test' }
        })).to.be.true
        expect(dispatchSpy.getCall(3).calledWith({
          type: 'TEST_UPDATE_SUCCESS_POST',
          uidField: configBase.uidField,
          record: Map({ uid: 123, name: 'test' }),
          responseData: { uid: 123, name: 'test' }
        })).to.be.true
        done()
      })
    })

    it('should call config.updater with provided data', () => {
      const action = new Update(configSpy)
      const data = Map({ name: 'test' })
      action.do(data)(dispatchSpy)
      expect(configSpy.updater.calledOnce).to.be.true
      expect(configSpy.updater.args[0][0]).to.deep.equal(data)
    })

    it('should convert record to immutable', () => {
      const action = new Update(configSpy)
      const data = { name: 'test' }
      action.do(data)(dispatchSpy)
      expect(configSpy.updater.args[0][0]).to.deep.equal(Map(data))
    })

    it('should dispatch error action', done => {
      const action = new Update(configError)
      action.do(Map({ uid: 123, name: 'test' }))(dispatchSpy).then(() => {
        expect(dispatchSpy.callCount).to.equal(4)
        expect(dispatchSpy.getCall(2).calledWith({
          type: 'TEST_UPDATE_ERROR',
          uidField: configBase.uidField,
          record: Map({ uid: 123, name: 'test' }),
          responseData: { error: 'test' }
        })).to.be.true
        expect(dispatchSpy.getCall(3).calledWith({
          type: 'TEST_UPDATE_ERROR_POST',
          uidField: configBase.uidField,
          record: Map({ uid: 123, name: 'test' }),
          responseData: { error: 'test' }
        })).to.be.true
        done()
      })
    })
  })
})
