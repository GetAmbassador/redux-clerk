import { datasetSelector } from './selectors'

/**
 * Generates selectors with the provided config
 * @param  {Object} config - selector configuration
 *
 * @return {Object} - Set of selectors
 */
const selectors = (config) => {
  if (!config) throw new Error('clerk.reducer: Expected config')
  if (!config.baseSelector) throw new Error('clerk.reducer: Expected baseSelector')

  return {
    dataset: datasetSelector.bind(null, config)
  }
}

export default selectors
