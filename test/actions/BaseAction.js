import { expect } from 'chai'
import sinon from 'sinon'
import BaseAction from '../../src/actions/BaseAction'
import * as actionNames from '../../src/utils/actionNames'

describe('Actions::BaseAction', () => {
  let generateActionNamesStub

  const config = {
    actionPrefix: 'test',
    uidField: 'uid'
  }

  const mockActionNames = {
    start: 'TEST_CREATE',
    success: 'TEST_CREATE_SUCCESS',
    error: 'TEST_CREATE_ERROR'
  }

  beforeEach(() => {
    generateActionNamesStub = sinon.stub(actionNames, 'generateActionNames', () => mockActionNames)
  })

  afterEach(() => {
    generateActionNamesStub.restore()
  })

  describe('constructor', () => {
    it('should set local configuration', () => {
      const action = new BaseAction('test', config)
      expect(action.config).to.deep.equal(config)
    })

    it('should set actionNames', () => {
      const action = new BaseAction('test', config)
      expect(generateActionNamesStub.calledOnce).to.be.true
      expect(action.actionNames).to.deep.equal(mockActionNames)
    })
  })

  describe('start', () => {
    it('should call provided dispatch function with action object', () => {
      const action = new BaseAction('create', config)
      const dispatch = sinon.spy()
      action.start(dispatch, { other: 'data' })
      expect(dispatch.calledOnce).to.be.true
      expect(dispatch.args[0][0]).to.deep.equal({ type: 'TEST_CREATE', data: { other: 'data' }})
    })
  })

  describe('success', () => {
    it('should call provided dispatch function with action object', () => {
      const action = new BaseAction('create', config)
      const dispatch = sinon.spy()
      action.success(dispatch, { other: 'data' })
      expect(dispatch.calledOnce).to.be.true
      expect(dispatch.args[0][0]).to.deep.equal({ type: 'TEST_CREATE_SUCCESS', data: { other: 'data' }})
    })
  })

  describe('error', () => {
    it('should call provided dispatch function with action object', () => {
      const action = new BaseAction('create', config)
      const dispatch = sinon.spy()
      action.error(dispatch, { other: 'data' })
      expect(dispatch.calledOnce).to.be.true
      expect(dispatch.args[0][0]).to.deep.equal({ type: 'TEST_CREATE_ERROR', data: { other: 'data' }})
    })
  })
})
