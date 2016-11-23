import Immutable from 'immutable'
import { actions } from '../../../lib'

const TodosActions = actions({
  actionPrefix: 'TODOS',
  uidField: 'id'
})

TodosActions.complete = (id) => {
  return TodosActions.update(Immutable.fromJS({ id, completed: true }))
}

export default TodosActions
