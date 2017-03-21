import { Create } from './Create'
import { Update } from './Update'
import { Remove } from './Remove'
import { Fetch } from './Fetch'
import { Instance } from './Instance'

/**
 * Creates a new instance of each CRUD action
 * @param  {Object} config - action configuration
 *
 * @return {Object} - the set of CRUD action creators
 */
const actions = (config) => {

  if (!config) throw new Error('clerk.actions: Expected config')
  if (!config.actionPrefix) throw new Error('clerk.actions: Expected actionPrefix')
  if (!config.uidField) throw new Error('clerk.actions: Expected uidField')

  const fetchAction = new Fetch(config)
  const createAction = new Create(config)
  const updateAction = new Update(config)
  const removeAction = new Remove(config)
  const instanceAction = new Instance(config)

  return {
    fetch: fetchAction.do,
    create: createAction.do,
    update: updateAction.do,
    remove: removeAction.do,
    createDataset: instanceAction.do
  }
}

export default actions
