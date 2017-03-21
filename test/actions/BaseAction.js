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
    startPost: 'TEST_CREATE_POST',
    success: 'TEST_CREATE_SUCCESS',
    successPost: 'TEST_CREATE_SUCCESS_POST',
    error: 'TEST_CREATE_ERROR',
    errorPost: 'TEST_CREATE_ERROR_POST'
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
      expect(action.config).to.deep.equal({
        actionPrefix: 'test',
        uidField: 'uid',
        type: 'test'
      })
    })

    it('should set actionNames', () => {
      const action = new BaseAction('test', config)
      expect(generateActionNamesStub.calledOnce).to.be.true
      expect(action.actionNames).to.deep.equal(mockActionNames)
    })
  })

  describe('validateInstance', () => {
    it('should throw an exception if instance key is not provided', () => {
      const action = new BaseAction('create', config)
      expect(action.validateInstance).to.throw('clerk.create: Expected instance key')
    })

    it('should throw an exception if instance key is not a string', () => {
      const action = new BaseAction('create', config)
      expect(action.validateInstance.bind(null, {})).to.throw('clerk.create: Instance key must be a string')
    })

    it('should throw an exception if instance key is not valid', () => {
      const action = new BaseAction('create', config)
      expect(action.validateInstance.bind(null, 'invalid key')).to.throw('clerk.create: Instance key can only contain A-Z, a-z, 0-9 or _')
    })

    it('should not throw an exception if instance key is valid', () => {
      const action = new BaseAction('create', config)
      expect(action.validateInstance.bind(null, 'validKey')).to.not.throw('clerk.create: Instance key can only contain A-Z, a-z, 0-9 or _')
      expect(action.validateInstance.bind(null, 'valid1')).to.not.throw('clerk.create: Instance key can only contain A-Z, a-z, 0-9 or _')
      expect(action.validateInstance.bind(null, 'valid_key')).to.not.throw('clerk.create: Instance key can only contain A-Z, a-z, 0-9 or _')
    })
  })

  describe('start', () => {
    it('should call provided dispatch function with action data and response data', () => {
      const action = new BaseAction('create', config)
      const dispatch = sinon.spy()
      action.start(dispatch, { action: 'data' }, { response: 'data' })
      expect(dispatch.calledTwice).to.be.true
      expect(dispatch.args[0][0]).to.deep.equal({ type: 'TEST_CREATE', action: 'data', responseData: { response: 'data' }})
      expect(dispatch.args[1][0]).to.deep.equal({ type: 'TEST_CREATE_POST', action: 'data', responseData: { response: 'data' }})
    })
  })

  describe('success', () => {
    it('should call provided dispatch function with action object', () => {
      const action = new BaseAction('create', config)
      const dispatch = sinon.spy()
      action.success(dispatch, { action: 'data' }, { response: 'data' })
      expect(dispatch.calledTwice).to.be.true
      expect(dispatch.args[0][0]).to.deep.equal({ type: 'TEST_CREATE_SUCCESS', action: 'data', responseData: { response: 'data' }})
      expect(dispatch.args[1][0]).to.deep.equal({ type: 'TEST_CREATE_SUCCESS_POST', action: 'data', responseData: { response: 'data' }})
    })
  })

  describe('error', () => {
    it('should call provided dispatch function with action object', () => {
      const action = new BaseAction('create', config)
      const dispatch = sinon.spy()
      action.error(dispatch, { action: 'data' }, { response: 'data' })
      expect(dispatch.calledTwice).to.be.true
      expect(dispatch.args[0][0]).to.deep.equal({ type: 'TEST_CREATE_ERROR', action: 'data', responseData: { response: 'data' }})
      expect(dispatch.args[1][0]).to.deep.equal({ type: 'TEST_CREATE_ERROR_POST', action: 'data', responseData: { response: 'data' }})
    })
  })
})
