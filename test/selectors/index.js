import { expect } from 'chai'
import selectors from '../../src/selectors'

describe('Selectors', () => {
  it('should throw exception if config is not provided', () => {
    expect(selectors).to.throw('clerk.selectors: Expected config')
  })

  it('should throw exception if config.baseSelector is not provided', () => {
    expect(selectors.bind(null, {})).to.throw('clerk.selectors: Expected baseSelector')
  })

  it('should return an object with the dataset selector', () => {
    const generatedSelectors = selectors({
      baseSelector: state => state.companies
    })
    expect(generatedSelectors.dataset).to.be.a('function')
    expect(generatedSelectors.datasetProperty).to.be.a('function')
  })
})
