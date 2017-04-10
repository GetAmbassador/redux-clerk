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
  let instanceData = baseState.getIn(['instances', instance, 'data'])
  const rawData = baseState.get('raw')

  // If instanceData is not created yet, return empty Map
  if(!instanceData) {
    return Map({})
  }

  // Get pending items
  const pendingCreate = baseState.getIn(['pending', 'create'], List())
  const pendingUpdate = baseState.getIn(['pending', 'update'], List())
  const pendingRemove = baseState.getIn(['pending', 'remove'], List())

  // Remove the pending.create items from the instance
  instanceData = instanceData.filter(uid => pendingCreate.indexOf(uid) === -1)

  // Re-compute data
  const computedData = instanceData.map(uid => {
    let item = rawData.get(uid)

    item = item.withMutations(map => {
      // Check pending.update and add the pendingUpdate prop if necessary
      if (pendingUpdate.indexOf(uid) > -1) {
        map.set('pendingUpdate', true)
      }
      // Check pending.remove and add the pendingRemove prop if necessary
      if (pendingRemove.indexOf(uid) > -1) {
        map.set('pendingRemove', true)
      }
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

  // Get pending items
  const pendingCreate = baseState.getIn(['pending', 'create'], List())
  const pendingUpdate = baseState.getIn(['pending', 'update'], List())
  const pendingRemove = baseState.getIn(['pending', 'remove'], List())

  // Remove the pending.remove items
  instanceData = instanceData.filter(uid => pendingRemove.indexOf(uid) === -1)

  // Merge with pendingRaw to account for updated items
  rawData = rawData.mergeDeep(baseState.get('pendingRaw'))

  // Re-compute data
  const computedData = instanceData.map(uid => {
    let item = rawData.get(uid)

    item = item.withMutations(map => {
      // Check pending.create and add the pendingCreate prop if necessary
      if (pendingCreate.indexOf(uid) > -1) {
        map.set('pendingCreate', true)
      }
      // Check pending.update and add the pendingUpdate prop if necessary
      if (pendingUpdate.indexOf(uid) > -1) {
        map.set('pendingUpdate', true)
      }
    })

    return item
  })

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
