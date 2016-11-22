/**
 * The selector for computing derived datasets
 * @param  {Object} config - selector configuration
 * @param  {Immutable.Map} state - current reducer state
 * @param  {Object} instance - instance key
 *
 * @return {Immutable.List} - computed data
 */
export const datasetSelector = (config, state, instance) => {

  // Get redux-clerk data from store
  const baseState = config.baseSelector(state)

  // Get instance array
  const instanceData = baseState.getIn(['instances', instance, 'data'])
  const rawData = baseState.get('raw')

  // Re-compute data
  return instanceData.map(i => rawData.get(i))
}
