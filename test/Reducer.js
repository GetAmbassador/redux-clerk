import { expect } from 'chai'
import * as sinon from 'sinon'
import reducer from '../src/reducer'
import * as actionNames from '../src/utils/actionNames'
import { createReducer, fetchReducer, updateReducer, deleteReducer } from '../src/reducers'

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
      deleteReducerStartStub,
      deleteReducerSuccessStub,
      deleteReducerErrorStub

  const config = {
    actionPrefix: 'users',
    uidField: 'uid'
  }

  const defaultState = {
    raw: {}
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
      start: 'USERS_DELETE',
      success: 'USERS_DELETE_SUCCESS',
      error: 'USERS_DELETE_ERROR'
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
    deleteReducerStartStub = sinon.stub(deleteReducer, 'start')
    deleteReducerSuccessStub = sinon.stub(deleteReducer, 'success')
    deleteReducerErrorStub = sinon.stub(deleteReducer, 'error')
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
    deleteReducerStartStub.restore()
    deleteReducerSuccessStub.restore()
    deleteReducerErrorStub.restore()
  })

  it('should throw exception if config is not provided', () => {
    expect(reducer).to.throw('clerk.reducer: Expected config')
  })

  it('should throw exception if config.eventPrefix is not provided', () => {
    expect(reducer.bind(this, {})).to.throw('clerk.reducer: Expected actionPrefix')
  })

  it('should throw exception if config.uid is not provided', () => {
    expect(reducer.bind(this, { actionPrefix: 'test' })).to.throw('clerk.reducer: Expected uidField')
  })

  it('should call generateActionNames with config.eventPrefix and each crud action', () => {
    reducer(config)
    expect(actionNames.generateActionNames.callCount).to.equal(4)
    expect(actionNames.generateActionNames.firstCall.calledWith('users', 'create')).to.be.true
    expect(actionNames.generateActionNames.secondCall.calledWith('users', 'fetch')).to.be.true
    expect(actionNames.generateActionNames.thirdCall.calledWith('users', 'update')).to.be.true
    expect(actionNames.generateActionNames.lastCall.calledWith('users', 'delete')).to.be.true
  })

  it('should return default state', () => {
    expect(reducer(config)(undefined, { type: 'unknown' }).toJS()).to.deep.equal(defaultState)
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

  it('should call updateReducer.start on USERS_UPDATE', () => {
    const action = {
      type: 'USERS_UPDATE'
    }
    reducer(config)(undefined, action)

    expect(updateReducerStartStub.calledOnce).to.be.true
    expect(updateReducerStartStub.args[0][0].toJS()).to.deep.equal(defaultState)
    expect(updateReducerStartStub.args[0][1]).to.deep.equal(action)
  })

  it('should call deleteReducer.start on USERS_DELETE', () => {
    const action = {
      type: 'USERS_DELETE'
    }
    reducer(config)(undefined, action)

    expect(deleteReducerStartStub.calledOnce).to.be.true
    expect(deleteReducerStartStub.args[0][0].toJS()).to.deep.equal(defaultState)
    expect(deleteReducerStartStub.args[0][1]).to.deep.equal(action)
  })
})
