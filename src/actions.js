import { Create, Insert, Update, Delete } from './actions'

const actions = (config) => {
  const createAction = new Create(config)
  const insertAction = new Insert(config)
  const updateAction = new Update(config)
  const deleteAction = new Delete(config)

  return {
    create: createAction.do,
    insert: insertAction.do,
    update: updateAction.do,
    delete: deleteAction.do
  }
}

export default actions
