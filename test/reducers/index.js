import { expect } from 'chai'
import * as sinon from 'sinon'
import Immutable from 'immutable'
import reducer from '../../src/reducers'
import * as actionNames from '../../src/utils/actionNames'
import createReducer from '../../src/reducers/create'
import fetchReducer from '../../src/reducers/fetch'
import updateReducer from '../../src/reducers/update'
import removeReducer from '../../src/reducers/remove'

describe('Reducer', () => {
  let generateActionNamesStub,
      fetchReducerStartStub,
      fetchReducerSuccessStub,
      fetchReducerErrorStub,
      createReducerStartStub,
      createReducerSuccessStub,
      createReducerErrorStub,
      updateReducerStartStub,
      updateReducerSuccessStub,
      updateReducerErrorStub,
      removeReducerStartStub,
      removeReducerSuccessStub,
      removeReducerErrorStub

  const config = {
    actionPrefix: 'users',
  }

  const defaultState = {
    raw: {},
    pendingRaw: {},
    pending: {
      create: [],
      update: [],
      remove: []
    },
    instances: {}
  }

  beforeEach(() => {
    generateActionNamesStub = sinon.stub(actionNames, 'generateActionNames')
    generateActionNamesStub.onCall(0).returns({
      start: 'USERS_CREATE',
      success: 'USERS_CREATE_SUCCESS',
      error: 'USERS_CREATE_ERROR'
    })
    generateActionNamesStub.onCall(1).returns({
      start: 'USERS_FETCH',
      success: 'USERS_FETCH_SUCCESS',
      error: 'USERS_FETCH_ERROR'
    })
    generateActionNamesStub.onCall(2).returns({
      start: 'USERS_UPDATE',
      success: 'USERS_UPDATE_SUCCESS',
      error: 'USERS_UPDATE_ERROR'
    })
    generateActionNamesStub.onCall(3).returns({
      start: 'USERS_REMOVE',
      success: 'USERS_REMOVE_SUCCESS',
      error: 'USERS_REMOVE_ERROR'
    })
    fetchReducerStartStub = sinon.stub(fetchReducer, 'start')
    fetchReducerSuccessStub = sinon.stub(fetchReducer, 'success')
    fetchReducerErrorStub = sinon.stub(fetchReducer, 'error')
    createReducerStartStub = sinon.stub(createReducer, 'start')
    createReducerSuccessStub = sinon.stub(createReducer, 'success')
    createReducerErrorStub = sinon.stub(createReducer, 'error')
    updateReducerStartStub = sinon.stub(updateReducer, 'start')
    updateReducerSuccessStub = sinon.stub(updateReducer, 'success')
    updateReducerErrorStub = sinon.stub(updateReducer, 'error')
    removeReducerStartStub = sinon.stub(removeReducer, 'start')
    removeReducerSuccessStub = sinon.stub(removeReducer, 'success')
    removeReducerErrorStub = sinon.stub(removeReducer, 'error')
  })

  afterEach(() => {
    generateActionNamesStub.restore()
    fetchReducerStartStub.restore()
    fetchReducerSuccessStub.restore()
    fetchReducerErrorStub.restore()
    createReducerStartStub.restore()
    createReducerSuccessStub.restore()
    createReducerErrorStub.restore()
    updateReducerStartStub.restore()
    updateReducerSuccessStub.restore()
    updateReducerErrorStub.restore()
    removeReducerStartStub.restore()
    removeReducerSuccessStub.restore()
    removeReducerErrorStub.restore()
  })

  it('should throw exception if config is not provided', () => {
    expect(reducer).to.throw('clerk.reducer: Expected config')
  })

  it('should throw exception if config.eventPrefix is not provided', () => {
    expect(reducer.bind(this, {})).to.throw('clerk.reducer: Expected actionPrefix')
  })

  it('should call generateActionNames with config.eventPrefix and each crud action', () => {
    reducer(config)
    expect(actionNames.generateActionNames.callCount).to.equal(4)
    expect(actionNames.generateActionNames.firstCall.calledWith('users', 'create')).to.be.true
    expect(actionNames.generateActionNames.secondCall.calledWith('users', 'fetch')).to.be.true
    expect(actionNames.generateActionNames.thirdCall.calledWith('users', 'update')).to.be.true
    expect(actionNames.generateActionNames.lastCall.calledWith('users', 'remove')).to.be.true
  })

  it('should return default state', () => {
    expect(reducer(config)(undefined, { type: 'unknown' }).toJS()).to.deep.equal(defaultState)
  })

  it('should preserve existing state', () => {
    const previousState = Immutable.fromJS({
      raw: {
        123: { name: 'test' }
      }
    })

    const expectedState = {
      raw: {
        123: { name: 'test' }
      },
      pendingRaw: {},
      pending: {
        create: [],
        update: [],
        remove: []
      },
      instances: {}
    }

    expect(reducer(config)(previousState, { type: 'unknown' }).toJS()).to.deep.equal(expectedState)
  })

  it('should call fetchReducer.start on USERS_FETCH', () => {
    const action = {
      type: 'USERS_FETCH'
    }
    reducer(config)(undefined, action)

    expect(fetchReducerStartStub.calledOnce).to.be.true
    expect(fetchReducerStartStub.args[0][0].toJS()).to.deep.equal(defaultState)
    expect(fetchReducerStartStub.args[0][1]).to.deep.equal(action)
  })

  it('should call fetchReducer.success on USERS_FETCH_SUCCESS', () => {
    const action = {
      type: 'USERS_FETCH_SUCCESS'
    }
    reducer(config)(undefined, action)

    expect(fetchReducerSuccessStub.calledOnce).to.be.true
    expect(fetchReducerSuccessStub.args[0][0].toJS()).to.deep.equal(defaultState)
    expect(fetchReducerSuccessStub.args[0][1]).to.deep.equal(action)
  })

  it('should call fetchReducer.error on USERS_FETCH_ERROR', () => {
    const action = {
      type: 'USERS_FETCH_ERROR'
    }
    reducer(config)(undefined, action)

    expect(fetchReducerErrorStub.calledOnce).to.be.true
    expect(fetchReducerErrorStub.args[0][0].toJS()).to.deep.equal(defaultState)
    expect(fetchReducerErrorStub.args[0][1]).to.deep.equal(action)
  })

  it('should call createReducer.start on USERS_CREATE', () => {
    const action = {
      type: 'USERS_CREATE'
    }
    reducer(config)(undefined, action)

    expect(createReducerStartStub.calledOnce).to.be.true
    expect(createReducerStartStub.args[0][0].toJS()).to.deep.equal(defaultState)
    expect(createReducerStartStub.args[0][1]).to.deep.equal(action)
  })

  it('should call createReducer.success on USERS_CREATE_SUCCESS', () => {
    const action = {
      type: 'USERS_CREATE_SUCCESS'
    }
    reducer(config)(undefined, action)

    expect(createReducerSuccessStub.calledOnce).to.be.true
    expect(createReducerSuccessStub.args[0][0].toJS()).to.deep.equal(defaultState)
    expect(createReducerSuccessStub.args[0][1]).to.deep.equal(action)
  })

  it('should call createReducer.error on USERS_CREATE_ERROR', () => {
    const action = {
      type: 'USERS_CREATE_ERROR'
    }
    reducer(config)(undefined, action)

    expect(createReducerErrorStub.calledOnce).to.be.true
    expect(createReducerErrorStub.args[0][0].toJS()).to.deep.equal(defaultState)
    expect(createReducerErrorStub.args[0][1]).to.deep.equal(action)
  })

  it('should call updateReducer.start on USERS_UPDATE', () => {
    const action = {
      type: 'USERS_UPDATE'
    }
    reducer(config)(undefined, action)

    expect(updateReducerStartStub.calledOnce).to.be.true
    expect(updateReducerStartStub.args[0][0].toJS()).to.deep.equal(defaultState)
    expect(updateReducerStartStub.args[0][1]).to.deep.equal(action)
  })

  it('should call updateReducer.success on USERS_UPDATE_SUCCESS', () => {
    const action = {
      type: 'USERS_UPDATE_SUCCESS'
    }
    reducer(config)(undefined, action)

    expect(updateReducerSuccessStub.calledOnce).to.be.true
    expect(updateReducerSuccessStub.args[0][0].toJS()).to.deep.equal(defaultState)
    expect(updateReducerSuccessStub.args[0][1]).to.deep.equal(action)
  })

  it('should call updateReducer.error on USERS_UPDATE_ERROR', () => {
    const action = {
      type: 'USERS_UPDATE_ERROR'
    }
    reducer(config)(undefined, action)

    expect(updateReducerErrorStub.calledOnce).to.be.true
    expect(updateReducerErrorStub.args[0][0].toJS()).to.deep.equal(defaultState)
    expect(updateReducerErrorStub.args[0][1]).to.deep.equal(action)
  })

  it('should call removeReducer.start on USERS_REMOVE', () => {
    const action = {
      type: 'USERS_REMOVE'
    }
    reducer(config)(undefined, action)

    expect(removeReducerStartStub.calledOnce).to.be.true
    expect(removeReducerStartStub.args[0][0].toJS()).to.deep.equal(defaultState)
    expect(removeReducerStartStub.args[0][1]).to.deep.equal(action)
  })

  it('should call removeReducer.success on USERS_REMOVE_SUCCESS', () => {
    const action = {
      type: 'USERS_REMOVE_SUCCESS'
    }
    reducer(config)(undefined, action)

    expect(removeReducerSuccessStub.calledOnce).to.be.true
    expect(removeReducerSuccessStub.args[0][0].toJS()).to.deep.equal(defaultState)
    expect(removeReducerSuccessStub.args[0][1]).to.deep.equal(action)
  })

  it('should call removeReducer.error on USERS_REMOVE_ERROR', () => {
    const action = {
      type: 'USERS_REMOVE_ERROR'
    }
    reducer(config)(undefined, action)

    expect(removeReducerErrorStub.calledOnce).to.be.true
    expect(removeReducerErrorStub.args[0][0].toJS()).to.deep.equal(defaultState)
    expect(removeReducerErrorStub.args[0][1]).to.deep.equal(action)
  })
})
