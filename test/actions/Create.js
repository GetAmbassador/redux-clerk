import { expect } from 'chai'
import sinon from 'sinon'
import { Map } from 'immutable'
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

  const configSpy = Object.assign({}, configBase, {
    creator: sinon.spy()
  })

  beforeEach(() => {
    dispatchSpy = sinon.spy()
  })

  describe('do', () => {
    it('should return a thunk', () => {
      const action = new Create(configBase)
      const actionDo = action.do('users', { uid: 'new', name: 'test' })
      expect(actionDo).to.be.a('function')
    })

    it('should dispatch start action', () => {
      const action = new Create(configBase)
      const data = Map({ other: 'data' })
      action.do('users', data)(dispatchSpy)
      expect(dispatchSpy.calledOnce).to.be.true
      expect(dispatchSpy.calledWith({
        type: 'TEST_CREATE',
        instance: 'users',
        record: Map({ other: 'data' }),
        uidField: configBase.uidField
      })).to.be.true
    })

    it('should call config.creator with provided data', () => {
      const action = new Create(configSpy)
      const data = Map({ name: 'test' })
      action.do('users', data)(dispatchSpy)
      expect(configSpy.creator.calledOnce).to.be.true
      expect(configSpy.creator.args[0][0]).to.deep.equal(data)
    })

    it('should convert record to immutable', () => {
      const action = new Create(configSpy)
      const data = { name: 'test' }
      action.do('users', data)(dispatchSpy)
      expect(configSpy.creator.args[0][0]).to.deep.equal(Map(data))
    })

    it('should dispatch success action', done => {
      const action = new Create(configSuccess)
      const data = Map({ uid: 'new', name: 'test' })
      action.do('users', data)(dispatchSpy).then(() => {
        expect(dispatchSpy.calledTwice).to.be.true
        expect(dispatchSpy.secondCall.calledWith({
          type: 'TEST_CREATE_SUCCESS',
          instance: 'users',
          record: Map({ uid: 'new', name: 'test' }),
          uidField: configBase.uidField,
          responseData: { uid: 123, name: 'test' }
        })).to.be.true
        done()
      })
    })

    it('should dispatch error action', done => {
      const action = new Create(configError)
      const data = Map({ uid: 'new', name: 'test' })
      action.do('users', data)(dispatchSpy).then(() => {
        expect(dispatchSpy.calledTwice).to.be.true
        expect(dispatchSpy.secondCall.calledWith({
          type: 'TEST_CREATE_ERROR',
          instance: 'users',
          record: Map({ uid: 'new', name: 'test' }),
          uidField: configBase.uidField,
          responseData: { error: 'test' }
        })).to.be.true
        done()
      })
    })
  })
})
