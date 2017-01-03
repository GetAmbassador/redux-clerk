import { Map } from 'immutable'

/**
 * The selector for computing derived datasets
 * @param  {Object} config - selector configuration
 * @param  {Immutable.Map} state - current reducer state
 * @param  {Object} instance - instance key
 *
 * @return {Immutable.Map} - computed data
 */
export const datasetSelector = (config, state, instance) => {

  // Get redux-clerk data from store
  const baseState = config.baseSelector(state)

  // Get instance array
  const instanceData = baseState.getIn(['instances', instance, 'data'])
  const rawData = baseState.get('raw')

  // If instanceData is not created yet, return empty Map
  if(!instanceData) {
    return Map({})
  }

  // Re-compute data
  const computedData = instanceData.map(i => rawData.get(i))

  // Gather additional data
  const additionalData = baseState.getIn(['instances', instance, 'additionalData']) || Map({})

  return additionalData.merge(Map({ data: computedData }))
}
