import { expect } from 'chai'
import sinon from 'sinon'
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
      action.do({ other: 'data' })(dispatchSpy)
      expect(dispatchSpy.calledOnce).to.be.true
      expect(dispatchSpy.calledWith({
        type: 'TEST_UPDATE',
        uidField: configBase.uidField,
        record: { other: 'data' }
      })).to.be.true
    })

    it('should dispatch success action', done => {
      const action = new Update(configSuccess)
      action.do({ uid: 123, name: 'test' })(dispatchSpy).then(() => {
        expect(dispatchSpy.calledTwice).to.be.true
        expect(dispatchSpy.secondCall.calledWith({
          type: 'TEST_UPDATE_SUCCESS',
          uidField: configBase.uidField,
          record: { uid: 123, name: 'test' },
          responseData: { uid: 123, name: 'test' }
        })).to.be.true
        done()
      })
    })

    it('should call config.updater with provided data', () => {
      const action = new Update(configSpy)
      const data = { name: 'test' }
      action.do(data)(dispatchSpy)
      expect(configSpy.updater.calledOnce).to.be.true
      expect(configSpy.updater.args[0][0]).to.deep.equal(data)
    })

    it('should dispatch error action', done => {
      const action = new Update(configError)
      action.do({ uid: 123, name: 'test' })(dispatchSpy).then(() => {
        expect(dispatchSpy.calledTwice).to.be.true
        expect(dispatchSpy.secondCall.calledWith({
          type: 'TEST_UPDATE_ERROR',
          uidField: configBase.uidField,
          record: { uid: 123, name: 'test' },
          responseData: { error: 'test' }
        })).to.be.true
        done()
      })
    })
  })
})
