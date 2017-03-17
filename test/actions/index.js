import { expect } from 'chai'
import actions from '../../src/actions'

describe('Actions', () => {
  const config = {
    actionPrefix: 'users',
    uidField: 'uid'
  }

  it('should throw exception if config is not provided', () => {
    expect(actions).to.throw('clerk.actions: Expected config')
  })

  it('should throw exception if config.eventPrefix is not provided', () => {
    expect(actions.bind(this, {})).to.throw('clerk.actions: Expected actionPrefix')
  })

  it('should throw exception if config.uid is not provided', () => {
    expect(actions.bind(this, { actionPrefix: 'test' })).to.throw('clerk.actions: Expected uidField')
  })

  it('should return an object with action creators', () => {
    const actionCreators = actions(config)

    expect(actionCreators.create).to.be.a('function')
    expect(actionCreators.update).to.be.a('function')
    expect(actionCreators.remove).to.be.a('function')
    expect(actionCreators.fetch).to.be.a('function')
    expect(actionCreators.createDataset).to.be.a('function')
  })
})
