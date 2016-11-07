import { expect } from 'chai'
import sinon from 'sinon'
import { Delete } from '../../src/actions/Delete'

describe('Actions::Delete', () => {

  let dispatchSpy

  const configBase = {
    actionPrefix: 'test',
    uidField: 'uid'
  }

  const configSuccess = Object.assign({}, configBase, {
    deleter: (uid, success) => {
      success()
      return Promise.resolve()
    }
  })

  const configError = Object.assign({}, configBase, {
    deleter: (data, success, error) => {
      error({ error: 'test' })
      return Promise.resolve()
    }
  })

  const configSpy = Object.assign({}, configBase, {
    deleter: sinon.spy()
  })

  beforeEach(() => {
    dispatchSpy = sinon.spy()
  })

  describe('do', () => {
    it('should return a thunk', () => {
      const action = new Delete(configBase)
      const actionDo = action.do(123)
      expect(actionDo).to.be.a('function')
    })

    it('should dispatch start action', () => {
      const action = new Delete(configBase)
      action.do(123)(dispatchSpy)
      expect(dispatchSpy.calledOnce).to.be.true
      expect(dispatchSpy.calledWith({
        type: 'TEST_DELETE',
        uid: 123,
        uidField: configBase.uidField
      })).to.be.true
    })

    it('should call config.deleter with provided uid', () => {
      const action = new Delete(configSpy)
      action.do(123)(dispatchSpy)
      expect(configSpy.deleter.calledOnce).to.be.true
      expect(configSpy.deleter.args[0][0]).to.deep.equal(123)
    })

    it('should dispatch success action', done => {
      const action = new Delete(configSuccess)
      action.do(123)(dispatchSpy).then(() => {
        expect(dispatchSpy.calledTwice).to.be.true
        expect(dispatchSpy.secondCall.calledWith({
          type: 'TEST_DELETE_SUCCESS',
          uid: 123,
          uidField: configBase.uidField
        })).to.be.true
        done()
      })
    })

    it('should dispatch error action', done => {
      const action = new Delete(configError)
      action.do(123)(dispatchSpy).then(() => {
        expect(dispatchSpy.calledTwice).to.be.true
        expect(dispatchSpy.secondCall.calledWith({
          type: 'TEST_DELETE_ERROR',
          uid: 123,
          uidField: configBase.uidField,
          responseData: { error: 'test' }
        })).to.be.true
        done()
      })
    })
  })
})
