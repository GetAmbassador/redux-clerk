import { Create } from './actions/Create'
import { Update } from './actions/Update'
import { Delete } from './actions/Delete'
import { Fetch } from './actions/Fetch'
import { Instance } from './actions/Instance'

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
  const deleteAction = new Delete(config)
  const instanceAction = new Instance(config)

  return {
    fetch: fetchAction.do,
    create: createAction.do,
    update: updateAction.do,
    delete: deleteAction.do,
    createInstance: instanceAction.do
  }
}

export default actions
