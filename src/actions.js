import { Create } from './actions/Create'
import { Update } from './actions/Update'
import { Delete } from './actions/Delete'

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

  const createAction = new Create(config)
  const updateAction = new Update(config)
  const deleteAction = new Delete(config)

  return {
    create: createAction.do,
    update: updateAction.do,
    delete: deleteAction.do
  }
}

export default actions
