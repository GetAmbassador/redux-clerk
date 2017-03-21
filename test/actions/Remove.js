import { expect } from 'chai'
import sinon from 'sinon'
import { Remove } from '../../src/actions/Remove'

describe('Actions::Remove', () => {

  let dispatchSpy

  const configBase = {
    actionPrefix: 'test',
    uidField: 'uid'
  }

  const configSuccess = Object.assign({}, configBase, {
    remover: (uid, success) => {
      success()
      return Promise.resolve()
    }
  })

  const configError = Object.assign({}, configBase, {
    remover: (data, success, error) => {
      error({ error: 'test' })
      return Promise.resolve()
    }
  })

  const configSpy = Object.assign({}, configBase, {
    remover: sinon.spy()
  })

  beforeEach(() => {
    dispatchSpy = sinon.spy()
  })

  describe('do', () => {
    it('should return a thunk', () => {
      const action = new Remove(configBase)
      const actionDo = action.do('users', 123)
      expect(actionDo).to.be.a('function')
    })

    it('should dispatch start action', () => {
      const action = new Remove(configBase)
      action.do(123)(dispatchSpy)
      expect(dispatchSpy.calledTwice).to.be.true
      expect(dispatchSpy.firstCall.calledWith({
        type: 'TEST_REMOVE',
        uid: 123,
        uidField: configBase.uidField
      })).to.be.true
      expect(dispatchSpy.secondCall.calledWith({
        type: 'TEST_REMOVE_POST',
        uid: 123,
        uidField: configBase.uidField
      })).to.be.true
    })

    it('should call config.remover with provided uid', () => {
      const action = new Remove(configSpy)
      action.do(123)(dispatchSpy)
      expect(configSpy.remover.calledOnce).to.be.true
      expect(configSpy.remover.args[0][0]).to.deep.equal(123)
    })

    it('should dispatch success action', done => {
      const action = new Remove(configSuccess)
      action.do(123)(dispatchSpy).then(() => {
        expect(dispatchSpy.callCount).to.equal(4)
        expect(dispatchSpy.getCall(2).calledWith({
          type: 'TEST_REMOVE_SUCCESS',
          uid: 123,
          uidField: configBase.uidField
        })).to.be.true
        expect(dispatchSpy.getCall(3).calledWith({
          type: 'TEST_REMOVE_SUCCESS_POST',
          uid: 123,
          uidField: configBase.uidField
        })).to.be.true
        done()
      })
    })

    it('should dispatch error action', done => {
      const action = new Remove(configError)
      action.do(123)(dispatchSpy).then(() => {
        expect(dispatchSpy.callCount).to.equal(4)
        expect(dispatchSpy.getCall(2).calledWith({
          type: 'TEST_REMOVE_ERROR',
          uid: 123,
          uidField: configBase.uidField,
          responseData: { error: 'test' }
        })).to.be.true
        expect(dispatchSpy.getCall(3).calledWith({
          type: 'TEST_REMOVE_ERROR_POST',
          uid: 123,
          uidField: configBase.uidField,
          responseData: { error: 'test' }
        })).to.be.true
        done()
      })
    })
  })
})
