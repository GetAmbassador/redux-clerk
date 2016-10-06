import { Create, Insert, Update, Delete } from './actions'

const actions (config) => {
  const createAction = config => new Create(config)
  const insertAction = config => new Insert(config)
  const updateAction = config => new Update(config)
  const removeAction = config => new Delete(config)

  return {
    create: (data) => createAction.do,
    insert: (data) => insertAction.do,
    update: (data) => updateAction.do,
    delete: (data) => createAction.do
  }
}

export default actions
