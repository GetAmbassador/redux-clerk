import { expect } from 'chai'
import * as sinon from 'sinon'
import reducer from '../src/reducer'
import * as actionNames from '../src/utils/actionNames'
import { createReducer, fetchReducer, updateReducer, deleteReducer } from '../src/reducers'

describe('Reducer', () => {
  let generateActionNamesStub,
      fetchReducerSuccessStub,
      createReducerStartStub,
      updateReducerStartStub,
      deleteReducerStartStub

  const config = {
    eventPrefix: 'users',
    uidField: 'uid'
  }

  const defaultState = {
    raw: {}
  }

  beforeEach(() => {
    generateActionNamesStub = sinon.stub(actionNames, 'generateActionNames')
    generateActionNamesStub.onCall(0).returns({
      start: 'USERS_CREATE'
    })
    generateActionNamesStub.onCall(1).returns({
      success: 'USERS_FETCH_SUCCESS'
    })
    generateActionNamesStub.onCall(2).returns({
      start: 'USERS_UPDATE'
    })
    generateActionNamesStub.onCall(3).returns({
      start: 'USERS_DELETE'
    })
    fetchReducerSuccessStub = sinon.stub(fetchReducer, 'success')
    createReducerStartStub = sinon.stub(createReducer, 'start')
    updateReducerStartStub = sinon.stub(updateReducer, 'start')
    deleteReducerStartStub = sinon.stub(deleteReducer, 'start')
  })

  afterEach(() => {
    generateActionNamesStub.restore()
    fetchReducerSuccessStub.restore()
    createReducerStartStub.restore()
    updateReducerStartStub.restore()
    deleteReducerStartStub.restore()
  })

  it('should throw exception if config is not provided', () => {
    expect(reducer).to.throw('clerk.reducer: Expected config')
  })

  it('should throw exception if config.eventPrefix is not provided', () => {
    expect(reducer.bind(this, {})).to.throw('clerk.reducer: Expected eventPrefix')
  })

  it('should throw exception if config.uid is not provided', () => {
    expect(reducer.bind(this, { eventPrefix: 'test' })).to.throw('clerk.reducer: Expected uidField')
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

  it('should call fetchReducer.success on USERS_FETCH_SUCCESS', () => {
    const action = {
      type: 'USERS_FETCH_SUCCESS'
    }
    reducer(config)(undefined, action)

    expect(fetchReducerSuccessStub.calledOnce).to.be.true
    expect(fetchReducerSuccessStub.args[0][0].toJS()).to.deep.equal(defaultState)
    expect(fetchReducerSuccessStub.args[0][1]).to.deep.equal(action)
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
