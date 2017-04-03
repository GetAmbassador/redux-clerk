import { Map, List } from 'immutable'

/**
 * The selector for computing derived datasets without pending data
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
  const computedData = instanceData.map(uid => {
    let item = rawData.get(uid)

    item = item.withMutations(map => {
      // Check pending.create
      map.set('pendingCreate', baseState.getIn(['pending', 'create'], List()).indexOf(uid) > -1)
      // Check pending.update
      map.set('pendingUpdate', baseState.getIn(['pending', 'update'], List()).indexOf(uid) > -1)
      // Check pending.remove
      map.set('pendingRemove', baseState.getIn(['pending', 'remove'], List()).indexOf(uid) > -1)
    })

    return item
  })

  // Gather additional data
  const additionalData = baseState.getIn(['instances', instance, 'additionalData']) || Map({})

  return additionalData.merge(Map({ data: computedData }))
}

/**
 * The selector for computing derived datasets with pending data
 * @param  {Object} config - selector configuration
 * @param  {Immutable.Map} state - current reducer state
 * @param  {Object} instance - instance key
 *
 * @return {Immutable.Map} - computed data
 */
export const datasetOptimisticSelector = (config, state, instance) => {

  // Get redux-clerk data from store
  const baseState = config.baseSelector(state)

  // Get instance array
  let instanceData = baseState.getIn(['instances', instance, 'data'])

  let rawData = baseState.get('raw')

  // If instanceData is not created yet, return empty Map
  if(!instanceData) {
    return Map({})
  }

  // Remove the pending.remove items
  instanceData = instanceData.filter(uid => baseState.getIn(['pending', 'remove'], List()).indexOf(uid) === -1)

  // Merge with pendingRaw to account for updated items
  rawData = rawData.mergeDeep(baseState.get('pendingRaw'))

  // Re-compute data
  const computedData = instanceData.map(uid => rawData.get(uid))

  // Gather additional data
  const additionalData = baseState.getIn(['instances', instance, 'additionalData']) || Map({})

  return additionalData.merge(Map({ data: computedData }))
}

/**
 * The selector for retrieving a dataset property
 * @param  {Object} config - selector configuration
 * @param  {Immutable.Map} state - current reducer state
 * @param  {Object} instance - instance key
 * @param  {String} property - key of the property to retrieve
 *
 * @return {*} - the property value
 */
export const datasetPropertySelector = (config, state, instance, property) => {
  // Get redux-clerk data from store
  const baseState = config.baseSelector(state)

  // Return the property
  return baseState.getIn(['instances', instance, 'additionalData', property])
}
